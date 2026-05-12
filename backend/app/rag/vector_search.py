"""
pgvector semantic similarity search.
Searches within a set of Neo4j problem IDs (graph-bounded search).
"""
from openai import AsyncOpenAI
from app.core.config import settings
from app.db.postgres import SessionLocal
from sqlalchemy import text

openai_client = AsyncOpenAI(api_key=settings.openai_api_key)


async def embed_text(text_input: str) -> list[float]:
    resp = await openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text_input
    )
    return resp.data[0].embedding


async def find_similar_problems(query: str, problem_ids: list[str], top_k: int = 3) -> list[dict]:
    """
    Find problems semantically similar to the query,
    constrained to the graph neighborhood (problem_ids).
    """
    if not problem_ids:
        return []

    query_embedding = await embed_text(query)
    embedding_str = "[" + ",".join(str(x) for x in query_embedding) + "]"

    sql = text("""
        SELECT neo4j_id, content, difficulty, is_pyq,
               1 - (embedding <=> :embedding::vector) AS similarity
        FROM problem_embeddings
        WHERE neo4j_id = ANY(:ids)
        ORDER BY embedding <=> :embedding::vector
        LIMIT :top_k
    """)

    async with SessionLocal() as session:
        result = await session.execute(sql, {
            "embedding": embedding_str,
            "ids": problem_ids,
            "top_k": top_k
        })
        rows = result.fetchall()

    return [
        {
            "content": row.content,
            "difficulty": row.difficulty,
            "is_pyq": row.is_pyq,
            "similarity": float(row.similarity)
        }
        for row in rows
    ]


async def find_ncert_sections(query: str, subject: str = None, top_k: int = 2) -> list[dict]:
    """
    Find the most relevant NCERT section text for a query.
    This is the actual textbook explanation — grounded, precise.
    """
    query_embedding = await embed_text(query)
    embedding_str = "[" + ",".join(str(x) for x in query_embedding) + "]"

    filters = "WHERE 1=1"
    params: dict = {"embedding": embedding_str, "top_k": top_k}
    if subject:
        filters += " AND subject = :subject"
        params["subject"] = subject

    sql = text(f"""
        SELECT section_heading, content, chapter_name, subject,
               1 - (embedding <=> :embedding::vector) AS similarity
        FROM ncert_chunks
        {filters}
        ORDER BY embedding <=> :embedding::vector
        LIMIT :top_k
    """)

    async with SessionLocal() as session:
        result = await session.execute(sql, params)
        rows = result.fetchall()

    return [
        {
            "heading": row.section_heading,
            "content": row.content[:600],
            "chapter": row.chapter_name,
            "subject": row.subject,
            "similarity": float(row.similarity)
        }
        for row in rows
        if row.similarity > 0.70
    ]


async def find_similar_chunks(query: str, top_k: int = 5) -> list[dict]:
    """
    Find the most relevant wiki chunks for a query.
    Searches the Obsidian wiki content embedded in wiki_chunks table.
    """
    query_embedding = await embed_text(query)
    embedding_str = "[" + ",".join(str(x) for x in query_embedding) + "]"

    # Use f-string for embedding to avoid asyncpg named param issues with ::vector cast
    sql = text(f"""
        SELECT concept_name, section_heading, content, subject,
               1 - (embedding <=> '{embedding_str}'::vector) AS similarity
        FROM wiki_chunks
        ORDER BY embedding <=> '{embedding_str}'::vector
        LIMIT :top_k
    """)

    async with SessionLocal() as session:
        result = await session.execute(sql, {"top_k": top_k})
        rows = result.fetchall()

    return [
        {
            "concept": row.concept_name,
            "heading": row.section_heading,
            "content": row.content[:800],
            "subject": row.subject,
            "similarity": float(row.similarity)
        }
        for row in rows
        if float(row.similarity) > 0.65
    ]


async def find_similar_doubts(query: str, top_k: int = 2) -> list[dict]:
    """Find past doubts Sara asked that are similar to this one."""
    query_embedding = await embed_text(query)
    embedding_str = "[" + ",".join(str(x) for x in query_embedding) + "]"

    sql = text("""
        SELECT sara_query, resolved,
               1 - (embedding <=> :embedding::vector) AS similarity
        FROM doubt_history
        ORDER BY embedding <=> :embedding::vector
        LIMIT :top_k
    """)

    async with SessionLocal() as session:
        result = await session.execute(sql, {
            "embedding": embedding_str,
            "top_k": top_k
        })
        rows = result.fetchall()

    return [
        {"query": row.sara_query, "resolved": row.resolved, "similarity": float(row.similarity)}
        for row in rows
        if row.similarity > 0.75  # only surface genuinely similar doubts
    ]
