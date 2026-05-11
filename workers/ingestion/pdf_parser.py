"""
PDF Parser — extracts text from NCERT PDFs and splits into sections.

NCERT section pattern observed:
  Physics: "1.1 INTRODUCTION", "1.2 THE INTERNATIONAL SYSTEM OF UNITS"
  Math:    "1.1 Introduction", "1.2 Sets and their Representations"

Strategy:
  1. Extract full text via pdfplumber
  2. Clean noise (headers, footers, page numbers, watermarks)
  3. Split on section numbers (e.g. \n2.3 )
  4. Each section becomes one processing unit (~400-900 tokens)
  5. Sections too long (>1200 tokens) are split at paragraph boundaries
"""

import re
import pdfplumber
from dataclasses import dataclass

# Matches NCERT section headings: "2.3 Some Title" or "2.3 SOME TITLE"
SECTION_PATTERN = re.compile(
    r'(?<!\d)(\d{1,2}\.\d{1,2})\s+([A-Z][A-Za-z\s\'\-\(\)&,]{3,80})',
)

# Noise lines to strip from extracted text
NOISE_PATTERNS = [
    re.compile(r'^Reprint \d{4}-\d{2}$', re.MULTILINE),
    re.compile(r'^\d+\s+(PHYSICS|CHEMISTRY|MATHEMATICS|BIOLOGY)$', re.MULTILINE | re.IGNORECASE),
    re.compile(r'^(PHYSICS|CHEMISTRY|MATHEMATICS)\s+\d+$', re.MULTILINE | re.IGNORECASE),
    re.compile(r'^not to be republished$', re.MULTILINE | re.IGNORECASE),
    re.compile(r'^\s*Fig\.\s*\d+[\.\d]*.*$', re.MULTILINE),  # figure captions
    re.compile(r'^\s*Table\s+\d+[\.\d]*.*$', re.MULTILINE),  # table headers
]

MAX_SECTION_TOKENS = 1200   # ~900 words, safe for Haiku context
APPROX_CHARS_PER_TOKEN = 4


@dataclass
class Section:
    heading: str           # e.g. "2.3 Significant Figures"
    text: str              # full section text
    section_num: str       # e.g. "2.3"
    char_count: int


def extract_text(pdf_path: str) -> str:
    """Extract raw text from all pages of a PDF."""
    pages = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                pages.append(text)
    return "\n".join(pages)


def clean_text(raw: str) -> str:
    """Remove NCERT-specific noise from extracted text."""
    text = raw
    for pattern in NOISE_PATTERNS:
        text = pattern.sub("", text)
    # Collapse excessive blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove page number lines (standalone numbers)
    text = re.sub(r'^\s*\d{1,3}\s*$', '', text, flags=re.MULTILINE)
    return text.strip()


def split_into_sections(text: str, chapter_name: str) -> list[Section]:
    """
    Split cleaned text into sections based on NCERT heading pattern.
    Returns list of Section objects.
    """
    # Find all section heading positions
    matches = list(SECTION_PATTERN.finditer(text))

    if not matches:
        # No section headings found — treat entire text as one section
        return [Section(
            heading=chapter_name,
            text=text,
            section_num="0.0",
            char_count=len(text)
        )]

    sections = []

    # Text before first section (intro/overview) — keep if substantial
    pre_text = text[:matches[0].start()].strip()
    if len(pre_text) > 200:
        sections.append(Section(
            heading=f"{chapter_name} — Introduction",
            text=pre_text,
            section_num="0.0",
            char_count=len(pre_text)
        ))

    # Extract each section
    for i, match in enumerate(matches):
        section_num = match.group(1)
        heading_text = match.group(2).strip()
        full_heading = f"{section_num} {heading_text}"

        start = match.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        section_body = text[start:end].strip()

        # Skip very short sections (likely just a heading with no content)
        if len(section_body) < 100:
            continue

        # Split oversized sections at paragraph boundaries
        if len(section_body) > MAX_SECTION_TOKENS * APPROX_CHARS_PER_TOKEN:
            sub_sections = _split_large_section(full_heading, section_num, section_body)
            sections.extend(sub_sections)
        else:
            sections.append(Section(
                heading=full_heading,
                text=section_body,
                section_num=section_num,
                char_count=len(section_body)
            ))

    return sections


def _split_large_section(heading: str, section_num: str, text: str) -> list[Section]:
    """Split a large section at paragraph breaks to stay within token budget."""
    max_chars = MAX_SECTION_TOKENS * APPROX_CHARS_PER_TOKEN
    paragraphs = text.split('\n\n')
    chunks = []
    current = []
    current_len = 0

    for para in paragraphs:
        if current_len + len(para) > max_chars and current:
            chunks.append('\n\n'.join(current))
            current = [para]
            current_len = len(para)
        else:
            current.append(para)
            current_len += len(para)

    if current:
        chunks.append('\n\n'.join(current))

    return [
        Section(
            heading=f"{heading} (part {i+1})" if len(chunks) > 1 else heading,
            text=chunk,
            section_num=section_num,
            char_count=len(chunk)
        )
        for i, chunk in enumerate(chunks)
    ]


def extract_examples(text: str) -> list[str]:
    """
    Pull out 'Example N ... Solution ...' blocks from NCERT text.
    These become practice problems in Neo4j.
    """
    pattern = re.compile(
        r'Example\s+\d+[\.\s]+(.*?)(?=Example\s+\d+|Summary|Exercises|\Z)',
        re.DOTALL | re.IGNORECASE
    )
    return [m.group(0).strip() for m in pattern.finditer(text) if len(m.group(0)) > 50]


def parse_pdf(pdf_path: str, chapter_name: str) -> tuple[list[Section], list[str]]:
    """
    Full pipeline: PDF path → (sections, examples)
    Returns sections for concept extraction and examples for problem nodes.
    """
    raw = extract_text(pdf_path)
    clean = clean_text(raw)
    sections = split_into_sections(clean, chapter_name)
    examples = extract_examples(clean)
    return sections, examples
