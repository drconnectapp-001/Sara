"""
Core RAG pipeline. Runs on every message Sara sends.

Flow:
  extract_concepts → neo4j_traverse → pgvector_search
  → memory_retrieve → build_context → claude_respond → memory_update
"""
import json
from anthropic import AsyncAnthropic
from app.core.config import settings
from app.rag.graph_query import traverse_concept_neighborhood
from app.rag.vector_search import find_similar_problems
from app.rag.context_builder import build_context
from app.memory.engine import retrieve_sara_memory, update_sara_memory
from app.companion.prompts import build_system_prompt

client = AsyncAnthropic(api_key=settings.anthropic_api_key)

CONCEPT_EXTRACT_PROMPT = """You are a JEE subject expert. Given a student's message,
identify the JEE concepts being discussed. Return ONLY a JSON array of concept names.
Example: ["Angular Momentum", "Torque", "Moment of Inertia"]
If no specific concept, return [].
Message: {message}"""


async def extract_concepts(message: str) -> list[str]:
    resp = await client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=200,
        messages=[{
            "role": "user",
            "content": CONCEPT_EXTRACT_PROMPT.format(message=message)
        }]
    )
    try:
        return json.loads(resp.content[0].text)
    except Exception:
        return []


async def run_pipeline(message: str, session_id: str):
    """
    Main RAG pipeline. Returns an async generator for streaming.
    """
    # Step 1 — extract JEE concepts from the message
    concepts = await extract_concepts(message)

    # Step 2 — walk the knowledge graph for this concept cluster
    graph_context = await traverse_concept_neighborhood(concepts)

    # Step 3 — vector similarity within graph neighborhood
    similar = await find_similar_problems(message, graph_context.get("problem_ids", []))

    # Step 4 — retrieve Sara's memory context
    sara_memory = await retrieve_sara_memory(concepts)

    # Step 5 — assemble context
    context = build_context(graph_context, similar, sara_memory)

    # Step 6 — stream Claude response
    system = build_system_prompt(sara_memory, context)

    async with client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=1500,
        system=system,
        messages=[{"role": "user", "content": message}]
    ) as stream:
        full_response = ""
        async for text in stream.text_stream:
            full_response += text
            yield text

    # Step 7 — update Sara's memory after response
    await update_sara_memory(message, full_response, concepts)
