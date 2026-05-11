"""
Quick end-to-end test for the RAG pipeline.
Usage: docker compose exec api python -m app.rag.test
"""
import asyncio
from app.db.neo4j_client import init_neo4j
from app.rag.pipeline import run_pipeline


async def main():
    await init_neo4j()
    test_message = "I don't understand why angular momentum is conserved when there's no external torque"
    print(f"\nTest query: {test_message}\n")
    print("Response:\n" + "─" * 60)

    async for chunk in run_pipeline(test_message, "test-session"):
        print(chunk, end="", flush=True)

    print("\n" + "─" * 60)
    print("\nRAG pipeline test complete.")


if __name__ == "__main__":
    asyncio.run(main())
