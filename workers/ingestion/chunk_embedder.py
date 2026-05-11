"""
Chunk Embedder — embeds section text chunks into pgvector.

The graph stores compact concept nodes.
pgvector stores the full section text for semantic retrieval.

When Sara asks a doubt, Neo4j narrows to relevant concept IDs,
then pgvector finds the most relevant NCERT explanation text
within that neighborhood. Together they give precise, grounded answers.
"""

import asyncio
import asyncpg
from openai import AsyncOpenAI

EMBED_MODEL = "text-embedding-3-small"
EMBED_DIM = 1536
BATCH_SIZE = 20  # OpenAI allows up to 100, but 20 is safe + cheap

openai_client = AsyncOpenAI()


class ChunkEmbedder:

    def __init__(self, postgres_url: str):
        self.postgres_url = postgres_url
        self.conn = None

    async def connect(self):
        self.conn = await asyncpg.connect(self.postgres_url)
        await self.conn.execute("CREATE EXTENSION IF NOT EXISTS vector")

    async def close(self):
        if self.conn:
            await self.conn.close()

    async def embed_chapter_sections(
        self,
        section_results: list[dict],
        chapter_meta: dict
    ):
        """
        Embed all section texts for a chapter and store in pgvector.
        Each section becomes one searchable chunk.
        """
        chunks = []
        for section in section_results:
            text = section.get("_section_text", "")
            heading = section.get("_section_heading", "")
            if len(text) < 100:
                continue
            chunks.append({
                "text": f"{heading}\n\n{text}",
                "heading": heading,
                "chapter_id": chapter_meta["neo4j_id"],
                "chapter_name": chapter_meta["name"],
                "subject": chapter_meta["subject"],
            })

        if not chunks:
            return

        # Embed in batches
        for i in range(0, len(chunks), BATCH_SIZE):
            batch = chunks[i:i + BATCH_SIZE]
            texts = [c["text"] for c in batch]

            response = await openai_client.embeddings.create(
                model=EMBED_MODEL,
                input=texts
            )

            for chunk, embed_data in zip(batch, response.data):
                embedding = embed_data.embedding
                embedding_str = "[" + ",".join(str(x) for x in embedding) + "]"

                await self.conn.execute("""
                    INSERT INTO ncert_chunks
                        (chapter_id, chapter_name, subject, section_heading,
                         content, embedding)
                    VALUES ($1, $2, $3, $4, $5, $6::vector)
                    ON CONFLICT (chapter_id, section_heading)
                    DO UPDATE SET content = $5, embedding = $6::vector
                """,
                    chunk["chapter_id"],
                    chunk["chapter_name"],
                    chunk["subject"],
                    chunk["heading"],
                    chunk["text"][:3000],  # cap stored text
                    embedding_str
                )

        print(f"  [pgvector] {chapter_meta['name']}: {len(chunks)} chunks embedded")

    async def embed_concepts(self, section_results: list[dict], chapter_meta: dict):
        """
        Embed individual concept definitions for fine-grained similarity search.
        Stored in concept_embeddings table (already defined in init.sql).
        """
        concepts = []
        for section in section_results:
            for concept in section.get("concepts", []):
                if concept.get("name") and concept.get("definition"):
                    text = f"{concept['name']}: {concept['definition']}"
                    if concept.get("key_facts"):
                        text += " " + " ".join(concept["key_facts"][:3])
                    concepts.append({
                        "neo4j_id": f"{chapter_meta['neo4j_id']}-{concept['name'].lower().replace(' ', '-')[:40]}",
                        "text": text,
                        "subject": chapter_meta["subject"],
                        "chapter": chapter_meta["name"],
                    })

        if not concepts:
            return

        for i in range(0, len(concepts), BATCH_SIZE):
            batch = concepts[i:i + BATCH_SIZE]
            texts = [c["text"] for c in batch]

            response = await openai_client.embeddings.create(
                model=EMBED_MODEL,
                input=texts
            )

            for concept, embed_data in zip(batch, response.data):
                embedding_str = "[" + ",".join(str(x) for x in embed_data.embedding) + "]"
                await self.conn.execute("""
                    INSERT INTO concept_embeddings
                        (neo4j_id, content, embedding, subject, chapter)
                    VALUES ($1, $2, $3::vector, $4, $5)
                    ON CONFLICT (neo4j_id)
                    DO UPDATE SET content = $2, embedding = $3::vector
                """,
                    concept["neo4j_id"],
                    concept["text"],
                    embedding_str,
                    concept["subject"],
                    concept["chapter"],
                )
