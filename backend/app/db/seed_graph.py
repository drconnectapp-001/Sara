"""
Run this once after first docker compose up to load JEE knowledge graph.
Usage: docker compose exec api python -m app.db.seed_graph
"""
import asyncio
from app.db.neo4j_client import init_neo4j, seed_graph


async def main():
    await init_neo4j()
    await seed_graph()
    print("Knowledge graph seeded successfully.")


if __name__ == "__main__":
    asyncio.run(main())
