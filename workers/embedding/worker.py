"""
Embedding Worker — processes JEE content from Neo4j into pgvector.

Fetches all Concept and Problem nodes from Neo4j that don't yet have
embeddings, generates embeddings via OpenAI, and stores them in pgvector.

Run modes:
  python worker.py           → continuous loop (runs in Docker)
  python worker.py --once    → single pass and exit
"""
import asyncio
import os
import sys
import time
from openai import AsyncOpenAI
from neo4j import AsyncGraphDatabase
import asyncpg
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
NEO4J_URI = os.environ.get("NEO4J_URI", "bolt://neo4j:7687")
NEO4J_USER = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ["NEO4J_PASSWORD"]
POSTGRES_URL = os.environ["POSTGRES_URL"]

openai = AsyncOpenAI(api_key=OPENAI_API_KEY)
EMBED_MODEL = "text-embedding-3-small"
BATCH_SIZE = 50
SLEEP_BETWEEN_RUNS = 300  # 5 minutes


async def embed_texts(texts: list[str]) -> list[list[float]]:
    resp = await openai.embeddings.create(model=EMBED_MODEL, input=texts)
    return [item.embedding for item in resp.data]


async def get_unembedded_concepts(neo4j_session) -> list[dict]:
    result = await neo4j_session.run("""
        MATCH (c:Concept)
        WHERE c.embedding_id IS NULL
        RETURN c.id AS id, c.name AS name,
               c.description AS description
        LIMIT $limit
    """, limit=BATCH_SIZE)
    return [record.data() async for record in result]


async def get_unembedded_problems(neo4j_session) -> list[dict]:
    result = await neo4j_session.run("""
        MATCH (p:Problem)
        WHERE p.embedding_id IS NULL
        RETURN p.id AS id, p.content AS content,
               p.difficulty AS difficulty, p.is_pyq AS is_pyq
        LIMIT $limit
    """, limit=BATCH_SIZE)
    return [record.data() async for record in result]


async def process_concepts(neo4j_session, pg_conn):
    concepts = await get_unembedded_concepts(neo4j_session)
    if not concepts:
        return 0

    texts = [f"{c['name']}: {c['description'] or ''}" for c in concepts]
    embeddings = await embed_texts(texts)

    for concept, embedding in zip(concepts, embeddings):
        embedding_str = "[" + ",".join(str(x) for x in embedding) + "]"
        row_id = await pg_conn.fetchval("""
            INSERT INTO concept_embeddings (neo4j_id, content, embedding, subject)
            VALUES ($1, $2, $3::vector, $4)
            ON CONFLICT (neo4j_id) DO UPDATE SET embedding = $3::vector
            RETURNING id
        """, concept["id"], texts[concepts.index(concept)],
             embedding_str, concept.get("subject", "unknown"))

        # Mark as embedded in Neo4j
        await neo4j_session.run("""
            MATCH (c:Concept {id: $id})
            SET c.embedding_id = $eid
        """, id=concept["id"], eid=str(row_id))

    print(f"  Embedded {len(concepts)} concepts")
    return len(concepts)


async def process_problems(neo4j_session, pg_conn):
    problems = await get_unembedded_problems(neo4j_session)
    if not problems:
        return 0

    texts = [p["content"] for p in problems]
    embeddings = await embed_texts(texts)

    for problem, embedding in zip(problems, embeddings):
        embedding_str = "[" + ",".join(str(x) for x in embedding) + "]"
        row_id = await pg_conn.fetchval("""
            INSERT INTO problem_embeddings (neo4j_id, content, embedding, difficulty, is_pyq)
            VALUES ($1, $2, $3::vector, $4, $5)
            ON CONFLICT (neo4j_id) DO UPDATE SET embedding = $3::vector
            RETURNING id
        """, problem["id"], problem["content"], embedding_str,
             problem.get("difficulty"), problem.get("is_pyq", False))

        await neo4j_session.run("""
            MATCH (p:Problem {id: $id})
            SET p.embedding_id = $eid
        """, id=problem["id"], eid=str(row_id))

    print(f"  Embedded {len(problems)} problems")
    return len(problems)


async def run_once():
    neo4j_driver = AsyncGraphDatabase.driver(
        NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD)
    )
    pg_conn = await asyncpg.connect(
        POSTGRES_URL.replace("postgresql://", "").replace("postgresql+asyncpg://", "")
    )

    print("Embedding worker: starting pass...")
    async with neo4j_driver.session() as session:
        c_count = await process_concepts(session, pg_conn)
        p_count = await process_problems(session, pg_conn)
        print(f"Pass complete: {c_count} concepts, {p_count} problems embedded.")

    await pg_conn.close()
    await neo4j_driver.close()


async def main():
    once = "--once" in sys.argv
    while True:
        try:
            await run_once()
        except Exception as e:
            print(f"Worker error: {e}")
        if once:
            break
        print(f"Sleeping {SLEEP_BETWEEN_RUNS}s before next pass...")
        time.sleep(SLEEP_BETWEEN_RUNS)


if __name__ == "__main__":
    asyncio.run(main())
