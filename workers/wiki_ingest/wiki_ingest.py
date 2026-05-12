"""
wiki_ingest.py — Obsidian vault → Neo4j + pgvector

Reads Sara's Obsidian wiki (markdown files) and:
  1. Creates Concept nodes in Neo4j with RELATES_TO edges from [[wiki links]]
  2. Embeds content chunks into pgvector for RAG retrieval

No AI needed — everything is parsed from clean markdown structure.

Usage:
  python wiki_ingest.py --vault /path/to/Sara/wiki
  python wiki_ingest.py --vault /path/to/Sara/wiki --dry-run
"""

import os
import re
import sys
import asyncio
import argparse
from pathlib import Path

import yaml
import asyncpg
from neo4j import AsyncGraphDatabase
from openai import AsyncOpenAI

from dotenv import load_dotenv
load_dotenv()

NEO4J_URI      = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER     = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ["NEO4J_PASSWORD"]
POSTGRES_URL   = os.environ["POSTGRES_URL"]
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

EMBED_MODEL = "text-embedding-3-small"
EMBED_DIM   = 1536


# ── Markdown Parser ────────────────────────────────────────────────────────────

def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Extract YAML frontmatter and return (meta, body)."""
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            raw_yaml = text[3:end].strip()
            body = text[end + 4:].strip()
            try:
                meta = yaml.safe_load(raw_yaml) or {}
            except Exception:
                meta = {}
            return meta, body
    return {}, text


def extract_wiki_links(text: str) -> list[tuple[str, str]]:
    """
    Find all [[target]] and [[target|alias]] links.
    Returns list of (target, description) tuples.
    """
    links = []
    for match in re.finditer(r'\[\[([^\]]+)\]\](?:\s*—\s*([^\n]+))?', text):
        target = match.group(1).split("|")[0].strip()
        desc   = (match.group(2) or "").strip()
        links.append((target, desc))
    return links


def extract_title(body: str) -> str:
    """Get the first H1 heading."""
    for line in body.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return ""


def infer_subject(tags: list[str], path: Path) -> str:
    """Infer subject from tags or file path."""
    tag_set = set(t.lower() for t in tags)
    if "physics" in tag_set:
        return "Physics"
    if "chemistry" in tag_set:
        return "Chemistry"
    if "mathematics" in tag_set or "math" in tag_set:
        return "Mathematics"
    path_str = str(path).lower()
    if "physics" in path_str:
        return "Physics"
    if "chemistry" in path_str:
        return "Chemistry"
    if "math" in path_str:
        return "Mathematics"
    return "General"


def chunk_content(body: str, title: str) -> list[dict]:
    """
    Split markdown body into chunks by H2 sections.
    Each chunk: {heading, content, char_count}
    """
    sections = re.split(r'\n## ', body)
    chunks = []

    # First block before any H2 = definition/intro
    if sections[0].strip():
        chunks.append({
            "heading": title,
            "content": sections[0].strip()
        })

    for section in sections[1:]:
        lines = section.splitlines()
        heading = lines[0].strip() if lines else "Section"
        content = "\n".join(lines[1:]).strip()
        if len(content) > 50:
            chunks.append({
                "heading": f"{title} — {heading}",
                "content": content
            })

    return chunks


# ── Neo4j Writer ───────────────────────────────────────────────────────────────

async def write_concept_to_neo4j(driver, concept: dict, dry_run: bool):
    """Upsert a Concept node and its RELATES_TO edges."""
    if dry_run:
        print(f"    [DRY RUN] Would write: {concept['name']} → {len(concept['links'])} links")
        return

    async with driver.session() as session:
        # Upsert concept node
        await session.run("""
            MERGE (c:Concept {id: $id})
            SET c.name     = $name,
                c.subject  = $subject,
                c.tags     = $tags,
                c.summary  = $summary,
                c.source   = 'wiki'
        """, {
            "id":      concept["id"],
            "name":    concept["name"],
            "subject": concept["subject"],
            "tags":    concept["tags"],
            "summary": concept["summary"]
        })

        # Create RELATES_TO edges from [[wiki links]]
        for target, description in concept["links"]:
            # Normalise: "concepts/kinematics" → "kinematics"
            target_id = Path(target).stem
            await session.run("""
                MERGE (target:Concept {id: $target_id})
                ON CREATE SET target.name = $target_name, target.source = 'wiki'
                WITH target
                MATCH (c:Concept {id: $source_id})
                MERGE (c)-[r:RELATES_TO]->(target)
                SET r.description = $desc
            """, {
                "source_id":   concept["id"],
                "target_id":   target_id,
                "target_name": target_id.replace("-", " ").title(),
                "desc":        description
            })


# ── pgvector Embedder ──────────────────────────────────────────────────────────

async def embed_texts(texts: list[str]) -> list[list[float]]:
    """Batch embed texts using OpenAI text-embedding-3-small."""
    response = await openai_client.embeddings.create(
        model=EMBED_MODEL,
        input=texts
    )
    return [item.embedding for item in response.data]


async def write_chunks_to_pgvector(conn, concept: dict, chunks: list[dict], dry_run: bool):
    """Embed and store concept chunks in pgvector."""
    if dry_run:
        print(f"    [DRY RUN] Would embed {len(chunks)} chunks")
        return

    texts = [f"{c['heading']}\n\n{c['content']}" for c in chunks]
    embeddings = await embed_texts(texts)

    for chunk, embedding in zip(chunks, embeddings):
        await conn.execute("""
            INSERT INTO wiki_chunks
                (concept_id, concept_name, subject, section_heading, content, embedding)
            VALUES ($1, $2, $3, $4, $5, $6::vector)
            ON CONFLICT (concept_id, section_heading) DO UPDATE
                SET content   = EXCLUDED.content,
                    embedding = EXCLUDED.embedding
        """,
            concept["id"],
            concept["name"],
            concept["subject"],
            chunk["heading"],
            chunk["content"],
            str(embedding)
        )


# ── Schema Setup ───────────────────────────────────────────────────────────────

async def ensure_schema(conn):
    """Create wiki_chunks table if it doesn't exist."""
    await conn.execute("""
        CREATE TABLE IF NOT EXISTS wiki_chunks (
            id               SERIAL PRIMARY KEY,
            concept_id       TEXT NOT NULL,
            concept_name     TEXT NOT NULL,
            subject          TEXT NOT NULL,
            section_heading  TEXT NOT NULL,
            content          TEXT,
            embedding        vector(1536),
            created_at       TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE (concept_id, section_heading)
        )
    """)
    await conn.execute("""
        CREATE INDEX IF NOT EXISTS wiki_chunks_embedding_idx
        ON wiki_chunks USING ivfflat (embedding vector_cosine_ops)
    """)


# ── Main ───────────────────────────────────────────────────────────────────────

async def main():
    parser = argparse.ArgumentParser(description="Ingest Obsidian wiki into Neo4j + pgvector")
    parser.add_argument("--vault",   required=True, help="Path to wiki/ folder inside Obsidian vault")
    parser.add_argument("--dry-run", action="store_true", help="Parse only, no DB writes")
    args = parser.parse_args()

    vault = Path(args.vault)
    concepts_dir = vault / "concepts"

    if not concepts_dir.exists():
        print(f"ERROR: concepts/ folder not found in {vault}")
        sys.exit(1)

    concept_files = sorted(concepts_dir.glob("*.md"))
    print(f"\nSara Wiki Ingestor")
    print(f"Vault   : {vault}")
    print(f"Concepts: {len(concept_files)} files")
    if args.dry_run:
        print("MODE    : DRY RUN")
    print()

    # Connect
    driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    conn   = None
    if not args.dry_run:
        conn = await asyncpg.connect(POSTGRES_URL)
        await ensure_schema(conn)

    total = len(concept_files)
    success = 0

    for idx, md_file in enumerate(concept_files, 1):
        print(f"[{idx}/{total}] {md_file.name}")

        text          = md_file.read_text(encoding="utf-8")
        meta, body    = parse_frontmatter(text)
        title         = extract_title(body)
        tags          = meta.get("tags", [])
        subject       = infer_subject(tags, md_file)
        concept_id    = md_file.stem   # e.g. "kinematics"
        links         = [(t, d) for t, d in extract_wiki_links(body) if t.startswith("concepts/")]
        summary_match = re.search(r'## Definition\n(.+?)(?=\n#|\Z)', body, re.DOTALL)
        summary       = summary_match.group(1).strip()[:500] if summary_match else ""

        concept = {
            "id":      concept_id,
            "name":    title or concept_id.replace("-", " ").title(),
            "subject": subject,
            "tags":    [str(t) for t in tags],
            "summary": summary,
            "links":   links
        }

        print(f"  Subject: {subject} | Links: {len(links)} | Tags: {tags[:3]}")

        # Write to Neo4j
        await write_concept_to_neo4j(driver, concept, args.dry_run)

        # Chunk + embed
        chunks = chunk_content(body, concept["name"])
        print(f"  Chunks : {len(chunks)}")

        if conn:
            await write_chunks_to_pgvector(conn, concept, chunks, args.dry_run)

        print(f"  ✓ Done")
        success += 1

    # Cleanup
    await driver.close()
    if conn:
        await conn.close()

    print(f"\n{'='*50}")
    print(f"Ingested {success}/{total} concepts")
    if not args.dry_run:
        print("Neo4j + pgvector updated.")


if __name__ == "__main__":
    asyncio.run(main())
