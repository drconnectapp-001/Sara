"""
Master Ingestion Orchestrator
Processes all PDFs in Class-11/ folder → Neo4j graph + pgvector chunks

Usage:
  # Process everything
  python ingest.py --pdf-dir ../../Class-11

  # Process one subject only
  python ingest.py --pdf-dir ../../Class-11 --subject Physics

  # Process one chapter (for testing)
  python ingest.py --pdf-dir ../../Class-11 --file keph101.pdf

  # Dry run (parse only, no DB writes)
  python ingest.py --pdf-dir ../../Class-11 --dry-run
"""

import os
import sys
import asyncio
import argparse
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

from config import CHAPTER_MAP, get_chapter_meta, SKIP_SUFFIXES
from pdf_parser import parse_pdf
from concept_extractor import extract_chapter
from graph_writer import GraphWriter
from chunk_embedder import ChunkEmbedder

NEO4J_URI      = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER     = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ["NEO4J_PASSWORD"]
POSTGRES_URL   = os.environ["POSTGRES_URL"]


async def ensure_ncert_chunks_table(embedder: ChunkEmbedder):
    """Create ncert_chunks table if it doesn't exist."""
    await embedder.conn.execute("""
        CREATE TABLE IF NOT EXISTS ncert_chunks (
            id              SERIAL PRIMARY KEY,
            chapter_id      TEXT NOT NULL,
            chapter_name    TEXT NOT NULL,
            subject         TEXT NOT NULL,
            section_heading TEXT NOT NULL,
            content         TEXT,
            embedding       vector(1536),
            UNIQUE (chapter_id, section_heading)
        )
    """)
    await embedder.conn.execute("""
        CREATE INDEX IF NOT EXISTS ncert_chunks_embed_idx
        ON ncert_chunks USING ivfflat (embedding vector_cosine_ops)
        WITH (lists = 50)
    """)


async def process_pdf(
    pdf_path: Path,
    chapter_meta: dict,
    graph: GraphWriter,
    embedder: ChunkEmbedder,
    dry_run: bool = False
) -> bool:
    """Process a single PDF file end-to-end."""
    chapter_name = chapter_meta["name"]
    subject = chapter_meta["subject"]

    print(f"\n{'='*60}")
    print(f"Processing: {pdf_path.name}")
    print(f"  Chapter : {chapter_name}")
    print(f"  Subject : {subject}")

    # Step 1 — parse PDF into sections
    sections, examples = parse_pdf(str(pdf_path), chapter_name)
    print(f"  Parsed  : {len(sections)} sections, {len(examples)} examples")

    if not sections:
        print(f"  SKIP: No sections found in {pdf_path.name}")
        return False

    if dry_run:
        for s in sections[:3]:
            print(f"    [{s.section_num}] {s.heading} — {s.char_count} chars")
        print(f"  DRY RUN — no DB writes")
        return True

    # Step 2 — extract concepts from all sections via Claude Haiku
    print(f"  Extracting concepts via Claude Haiku...")
    section_results, problem_results = await extract_chapter(
        sections, examples, chapter_name, subject
    )

    concept_count = sum(len(s.get("concepts", [])) for s in section_results)
    formula_count = sum(len(s.get("formulas", [])) for s in section_results)
    print(f"  Extracted: {concept_count} concepts, {formula_count} formulas, "
          f"{len(problem_results)} problems")

    # Step 3 — write to Neo4j
    print(f"  Writing to Neo4j...")
    await graph.write_chapter(chapter_meta, section_results, problem_results)

    # Step 4 — embed sections + concepts to pgvector
    print(f"  Embedding to pgvector...")
    await embedder.embed_chapter_sections(section_results, chapter_meta)
    await embedder.embed_concepts(section_results, chapter_meta)

    print(f"  DONE: {chapter_name}")
    return True


async def get_processed_chapters() -> set:
    """Return set of chapter IDs already in database."""
    try:
        embedder = ChunkEmbedder(POSTGRES_URL)
        await embedder.connect()
        result = await embedder.conn.fetch("SELECT DISTINCT chapter_id FROM ncert_chunks")
        processed = {row['chapter_id'] for row in result}
        await embedder.close()
        return processed
    except Exception as e:
        print(f"Warning: Could not fetch processed chapters: {e}")
        return set()


async def main():
    parser = argparse.ArgumentParser(description="Ingest NCERT PDFs into Sara's knowledge graph")
    parser.add_argument("--pdf-dir", required=True, help="Path to Class-11/ folder")
    parser.add_argument("--subject", choices=["Physics", "Chemistry", "Mathematics"],
                        help="Process only this subject")
    parser.add_argument("--file", help="Process only this PDF filename (e.g. keph101.pdf)")
    parser.add_argument("--dry-run", action="store_true", help="Parse only, no DB writes")
    args = parser.parse_args()

    pdf_dir = Path(args.pdf_dir)
    if not pdf_dir.exists():
        print(f"ERROR: PDF directory not found: {pdf_dir}")
        sys.exit(1)

    # Collect all PDFs to process
    all_pdfs = list(pdf_dir.rglob("*.pdf"))

    # Filter by specific file if requested
    if args.file:
        all_pdfs = [p for p in all_pdfs if p.name == args.file]
        if not all_pdfs:
            print(f"ERROR: File not found: {args.file}")
            sys.exit(1)

    # Get already-processed chapters to skip them
    processed = await get_processed_chapters()

    # Build processing queue
    queue = []
    skipped = []
    for pdf_path in sorted(all_pdfs):
        stem = pdf_path.stem   # e.g. "keph101"
        meta = get_chapter_meta(stem)
        if meta is None:
            continue  # skip answers/appendices
        if meta.get("type") != "content":
            continue  # skip problem set files for now
        if args.subject and meta.get("subject") != args.subject:
            continue

        # Skip if already processed
        chapter_id = meta.get("id")
        if chapter_id in processed:
            skipped.append(chapter_id)
            continue

        queue.append((pdf_path, meta))

    print(f"\nSara JEE Companion — NCERT Ingestion Pipeline")
    print(f"PDF directory : {pdf_dir}")
    print(f"Files to process: {len(queue)}")
    if skipped:
        print(f"Chapters already done: {len(skipped)} (skipping)")
    if args.dry_run:
        print("MODE: DRY RUN (no DB writes)")
    print()

    if not queue:
        print("Nothing to process.")
        return

    # Connect to databases
    graph = GraphWriter(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD)
    embedder = ChunkEmbedder(POSTGRES_URL)

    if not args.dry_run:
        await embedder.connect()
        await ensure_ncert_chunks_table(embedder)

    # Process each PDF sequentially (Neo4j + rate limits)
    success = 0
    failed = []
    total = len(queue)

    for idx, (pdf_path, meta) in enumerate(queue, 1):
        print(f"\n[{idx}/{total}] Processing {pdf_path.name}...")
        try:
            ok = await process_pdf(pdf_path, meta, graph, embedder, args.dry_run)
            if ok:
                success += 1
        except Exception as e:
            print(f"\n  ERROR processing {pdf_path.name}: {e}")
            failed.append((pdf_path.name, str(e)))
            continue  # don't stop on one failure

    # Cleanup
    await graph.close()
    if not args.dry_run:
        await embedder.close()

    # Summary
    print(f"\n{'='*60}")
    print(f"INGESTION COMPLETE")
    print(f"  Success : {success}/{len(queue)}")
    if failed:
        print(f"  Failed  : {len(failed)}")
        for name, err in failed:
            print(f"    {name}: {err}")
    print(f"\nNext step: run the embedding worker to verify all concept_embeddings are populated")
    print(f"  docker compose exec embedding_worker python worker.py --once")


if __name__ == "__main__":
    asyncio.run(main())
