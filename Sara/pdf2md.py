#!/usr/bin/env python3
"""
pdf2md.py — PDF to Markdown converter (no AI, no API)

Uses PyMuPDF to extract text blocks with font metadata, then reconstructs
Markdown structure from font sizes (headings), font flags (bold/italic),
and block positions (tables, lists).

Install:  pip install pymupdf
Usage:
  python pdf2md.py input.pdf
  python pdf2md.py input.pdf -o output.md
  python pdf2md.py input.pdf --pages 1-20
  python pdf2md.py raw/Chemistry/part2.pdf -o raw/Chemistry/part2.md
"""

import argparse
import re
import sys
from pathlib import Path
from collections import defaultdict

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Missing dependency:  pip install pymupdf")
    sys.exit(1)


# ── Constants ─────────────────────────────────────────────────────────────────

# Font flag bits (PyMuPDF)
SUPERSCRIPT = 1
ITALIC      = 2
SERIFED     = 4
MONOSPACED  = 8
BOLD        = 16

# Lines matching these patterns are stripped (page artifacts)
STRIP_PATTERNS = [
    r"^\s*Reprint\s+\d{4}[-–]\d{2,4}\s*$",   # Reprint 2026-27
    r"^\s*\d+\s*$",                            # Standalone page numbers
    r"^\s*(chemistry|physics|mathematics|biology|science)\s*$",  # Running headers
    r"^\s*NCERT\s*$",
    r"^\s*oeprint\s+\d{4}[-–]\d{2,4}\s*$",    # garbled "Reprint" after font decode
]

STRIP_RE = [re.compile(p, re.IGNORECASE) for p in STRIP_PATTERNS]


# ── NCERT font decode ─────────────────────────────────────────────────────────

def detect_ncert_encoding(doc: fitz.Document, page_indices: list[int]) -> bool:
    """
    Detect if this PDF uses the NCERT shifted-font encoding.
    Heuristic: sample body text from a few pages; if > 30% of chars are
    uppercase A-Z when the document appears to be prose, the font is shifted.
    """
    sample = []
    for pi in page_indices[:5]:
        page = doc[pi]
        sample.append(page.get_text("text"))
    text = " ".join(sample)
    if not text.strip():
        return False
    # Count uppercase letters vs total alpha
    uppers = sum(1 for c in text if c.isupper())
    alphas = sum(1 for c in text if c.isalpha())
    if alphas == 0:
        return False
    ratio = uppers / alphas
    # Normal English prose has ~5-10% uppercase; garbled NCERT PDFs have >40%
    return ratio > 0.35


def fix_ncert_encoding(text: str) -> str:
    """
    Decode the NCERT shifted-font encoding.
    In affected PDFs the ToUnicode table maps body-text glyphs to uppercase
    codepoints that are 29 lower than the correct lowercase codepoints.
    Shift A-Z (+29) back to their true characters; remap A,B,C edge cases.
    """
    result = []
    for ch in text:
        code = ord(ch)
        if 65 <= code <= 90:        # uppercase A-Z in garbled output
            decoded = code + 29
            # codes 94('^'),95('_'),96('`') come from A,B,C — capitalise them
            if decoded in (94, 95, 96):
                result.append(chr(decoded - 32))  # map back to A, B, C
            else:
                result.append(chr(decoded))
        elif ch == '[':             # x (120) → 120-29=91='['
            result.append('x')
        elif ch == '\\':            # y (121) → 121-29=92='\\'
            result.append('y')
        elif ch == ']':             # z (122) → 122-29=93=']'
            result.append('z')
        else:
            result.append(ch)
    return ''.join(result)


# ── Page range parsing ────────────────────────────────────────────────────────

def parse_pages(spec: str | None, total: int) -> list[int]:
    if not spec:
        return list(range(total))
    indices = []
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            indices.extend(range(int(a) - 1, int(b)))
        else:
            indices.append(int(part) - 1)
    return [i for i in indices if 0 <= i < total]


# ── Font size → heading level ─────────────────────────────────────────────────

def compute_heading_map(doc: fitz.Document, page_indices: list[int]) -> dict[float, int]:
    """
    Collect all font sizes across the document and assign heading levels.
    The body text size is the most frequent. Anything significantly larger
    becomes a heading, graduated by size.
    """
    size_counts: dict[float, int] = defaultdict(int)

    for pi in page_indices:
        page = doc[pi]
        blocks = page.get_text("dict", flags=fitz.TEXT_PRESERVE_WHITESPACE)["blocks"]
        for block in blocks:
            if block["type"] != 0:  # 0 = text block
                continue
            for line in block["lines"]:
                for span in line["spans"]:
                    size = round(span["size"], 1)
                    size_counts[size] += len(span["text"].strip())

    if not size_counts:
        return {}

    # Body size = most common by character count
    body_size = max(size_counts, key=size_counts.get)

    # Collect sizes larger than body
    larger = sorted([s for s in size_counts if s > body_size * 1.1], reverse=True)

    heading_map: dict[float, int] = {}
    for level, size in enumerate(larger[:4], start=1):
        heading_map[size] = level

    return heading_map


# ── Artifact detection ────────────────────────────────────────────────────────

def is_artifact(text: str) -> bool:
    text = text.strip()
    if not text:
        return True
    for pattern in STRIP_RE:
        if pattern.match(text):
            return True
    return False


# ── Table detection ───────────────────────────────────────────────────────────

def looks_like_table_row(spans: list[dict], page_width: float) -> bool:
    """
    Heuristic: if a line has 3+ spans spread across > 40% of the page width,
    it's probably a table row.
    """
    if len(spans) < 3:
        return False
    x_positions = [s["origin"][0] for s in spans]
    spread = max(x_positions) - min(x_positions)
    return spread > page_width * 0.4


# ── NCERT page conversion (text-mode based) ───────────────────────────────────

# Pattern: "8.4" or "8.4.1" at start of a line → section heading
_SECTION_RE = re.compile(r"^(\d+\.\d+(?:\.\d+)?)\s+(.+)", re.DOTALL)

def convert_page_ncert(page: fitz.Page, heading_map: dict[float, int]) -> str:
    """
    Alternative converter for PDFs with broken ToUnicode (NCERT Bookman-Light).
    Uses text-mode extraction (which falls back to glyph encoding) then applies
    the +29 shift decode. Font size info for headings comes from a parallel
    dict-mode pass on correctly-encoded spans only.
    """
    # Build a map: block_bbox → (dominant font size, dict-mode text) from dict mode
    dict_blocks = page.get_text("dict", flags=fitz.TEXT_PRESERVE_WHITESPACE)["blocks"]
    # key = (round_x0, round_y0)
    bbox_to_size: dict[tuple, float] = {}
    bbox_to_dicttext: dict[tuple, str] = {}
    for block in dict_blocks:
        if block["type"] == 1:
            continue
        if block["type"] != 0:
            continue
        size_chars: dict[float, int] = defaultdict(int)
        block_text_parts = []
        for line in block["lines"]:
            line_parts = []
            for span in line["spans"]:
                text = span["text"]
                bad = sum(1 for c in text if ord(c) == 0xFFFD)
                if text and bad / len(text) < 0.5:
                    size_chars[round(span["size"], 1)] += len(text)
                    line_parts.append(text)
                else:
                    line_parts.append("")
            block_text_parts.append("".join(line_parts))
        if size_chars:
            dom = max(size_chars, key=size_chars.get)
            key = (round(block["bbox"][0]), round(block["bbox"][1]))
            bbox_to_size[key] = dom
            bbox_to_dicttext[key] = " ".join(block_text_parts).strip()

    # Text-mode blocks give correct text via glyph encoding fallback
    text_blocks = page.get_text("blocks")  # (x0,y0,x1,y1,text,bno,btype)
    output_lines: list[str] = []

    for tb in text_blocks:
        x0, y0, x1, y1, raw_text, bno, btype = tb
        if btype == 1:
            output_lines.append("\n[Figure]\n")
            continue
        if btype != 0 or not raw_text.strip():
            continue

        # Look up heading level by block position
        key = (round(x0), round(y0))
        size = bbox_to_size.get(key, 0)
        heading_level = heading_map.get(size)

        if heading_level:
            # Headings use Bookman-Demi which reads OK in dict mode (only case errors)
            # dict text is better than text-mode+decode for these
            dict_text = bbox_to_dicttext.get(key, "")
            # Fix misplaced uppercase: lowercase letters that are mid-word uppercase
            fixed = re.sub(r'(?<=[a-z])([A-Z])(?=[a-z])', lambda m: m.group(1).lower(), dict_text)
            if not fixed.strip() or is_artifact(fixed.strip()):
                continue
            prefix = "#" * heading_level
            output_lines.append(f"{prefix} {fixed.strip()}")
            continue

        # Body text: use text mode + decode (Bookman-Light needs this)
        decoded = fix_ncert_encoding(raw_text)

        para_lines: list[str] = []
        for raw_line in decoded.splitlines():
            line = raw_line.strip()
            if not line or is_artifact(line):
                continue
            para_lines.append(line)

        if not para_lines:
            continue

        block_text = " ".join(para_lines)

        # Section heading by pattern (e.g. "8.4 Classification of ...")
        m = _SECTION_RE.match(block_text)
        if m:
            sec, rest = m.group(1), m.group(2).strip()
            depth = sec.count(".")  # "8.4"→1, "8.4.1"→2
            level = min(depth + 1, 4)
            output_lines.append(f"{'#' * level} {sec} {rest}")
            continue

        output_lines.append(block_text)

    return "\n\n".join(line for line in output_lines if line.strip())


# ── Core conversion ───────────────────────────────────────────────────────────

def convert_page(page: fitz.Page, heading_map: dict[float, int], ncert_fix: bool = False) -> str:
    """Convert a single page to Markdown text."""
    if ncert_fix:
        return convert_page_ncert(page, heading_map)

    page_width = page.rect.width
    blocks = page.get_text("dict", flags=fitz.TEXT_PRESERVE_WHITESPACE)["blocks"]

    output_lines: list[str] = []
    prev_was_table = False

    for block in blocks:
        if block["type"] == 1:
            # Image block — note it but skip
            output_lines.append("\n[Figure]\n")
            continue

        if block["type"] != 0:
            continue

        block_lines: list[str] = []
        in_table = False

        for line in block["lines"]:
            spans = line["spans"]
            if not spans:
                continue

            # Detect table row
            if looks_like_table_row(spans, page_width):
                # Collect cells by x-position clusters
                cells = [s["text"].strip() for s in sorted(spans, key=lambda s: s["origin"][0])]
                cells = [c for c in cells if c]
                if cells:
                    row = "| " + " | ".join(cells) + " |"
                    if not in_table:
                        # Add separator after header row
                        sep = "| " + " | ".join(["---"] * len(cells)) + " |"
                        block_lines.append(row)
                        block_lines.append(sep)
                        in_table = True
                    else:
                        block_lines.append(row)
                prev_was_table = True
                continue

            if in_table:
                in_table = False
                block_lines.append("")  # gap after table

            # Build line text with inline formatting
            line_parts: list[str] = []
            for span in spans:
                text = span["text"]
                if not text.strip():
                    line_parts.append(text)
                    continue
                flags = span["flags"]
                is_bold   = bool(flags & BOLD)
                is_italic = bool(flags & ITALIC)
                size = round(span["size"], 1)

                # Check heading
                heading_level = heading_map.get(size)
                if heading_level:
                    text = text.strip()
                    if text:
                        line_parts.append(text)
                    continue  # heading handled at line level below

                # Apply inline formatting
                if is_bold and is_italic:
                    text = f"***{text.strip()}***"
                elif is_bold:
                    text = f"**{text.strip()}**"
                elif is_italic:
                    text = f"*{text.strip()}*"

                line_parts.append(text)

            line_text = "".join(line_parts).strip()

            if not line_text or is_artifact(line_text):
                continue

            # Determine if this line is a heading
            # Use the dominant (most-chars) span's size
            size_chars: dict[float, int] = defaultdict(int)
            for span in spans:
                size_chars[round(span["size"], 1)] += len(span["text"].strip())
            dominant_size = max(size_chars, key=size_chars.get) if size_chars else 0
            heading_level = heading_map.get(dominant_size)

            if heading_level:
                prefix = "#" * heading_level
                line_text = f"{prefix} {line_text.lstrip('#').strip()}"

            block_lines.append(line_text)

        # Join block lines — consecutive non-heading lines become a paragraph
        if block_lines:
            output_lines.append("\n".join(block_lines))

    return "\n\n".join(line for line in output_lines if line.strip())


# ── Post-processing ───────────────────────────────────────────────────────────

def post_process(text: str) -> str:
    """
    Clean up common PDF extraction artefacts:
    - Merge hyphenated line breaks (e.g. "hydro-\ngen" → "hydrogen")
    - Collapse 3+ blank lines to 2
    - Fix spacing around markdown headers
    """
    # Merge hyphenated line breaks
    text = re.sub(r"-\n(\w)", r"\1", text)

    # Collapse excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Ensure blank line before headings
    text = re.sub(r"([^\n])\n(#{1,4} )", r"\1\n\n\2", text)

    # Strip trailing whitespace on each line
    text = "\n".join(line.rstrip() for line in text.splitlines())

    return text.strip()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Convert PDF to Markdown (no AI, no API key needed)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("pdf", help="Input PDF file")
    parser.add_argument("-o", "--output", help="Output .md file (default: same name as PDF)")
    parser.add_argument("--pages", help="Page range e.g. 1-20 or 1,3,5-10 (1-indexed)")
    parser.add_argument("--ncert-fix", action="store_true",
                        help="Force NCERT font decode (auto-detected by default)")
    parser.add_argument("--no-ncert-fix", action="store_true",
                        help="Disable NCERT font auto-detection")
    args = parser.parse_args()

    pdf_path = Path(args.pdf).expanduser().resolve()
    if not pdf_path.exists():
        print(f"Error: file not found — {pdf_path}")
        sys.exit(1)

    output_path = Path(args.output).expanduser() if args.output else pdf_path.with_suffix(".md")

    doc = fitz.open(str(pdf_path))
    total = doc.page_count
    page_indices = parse_pages(args.pages, total)

    print(f"PDF:    {pdf_path.name}  ({total} pages)")
    print(f"Pages:  {len(page_indices)} selected")
    print(f"Output: {output_path}")

    heading_map = compute_heading_map(doc, page_indices)
    if heading_map:
        sizes = sorted(heading_map, reverse=True)
        print(f"Headings detected at font sizes: {', '.join(str(s) for s in sizes)}")

    if args.ncert_fix:
        ncert_fix = True
    elif args.no_ncert_fix:
        ncert_fix = False
    else:
        ncert_fix = detect_ncert_encoding(doc, page_indices)
    if ncert_fix:
        print("NCERT font encoding detected — applying decode")

    parts: list[str] = []
    for i, pi in enumerate(page_indices, 1):
        print(f"  Page {pi + 1} ({i}/{len(page_indices)}) ...", end="\r", flush=True)
        page = doc[pi]
        md = convert_page(page, heading_map, ncert_fix=ncert_fix)
        if md.strip():
            parts.append(md)

    doc.close()

    full_text = post_process("\n\n".join(parts))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(full_text, encoding="utf-8")

    lines = full_text.count("\n")
    kb = output_path.stat().st_size // 1024
    print(f"\nDone → {output_path}  ({lines} lines, {kb} KB)")


if __name__ == "__main__":
    main()
