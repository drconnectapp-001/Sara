from neo4j import AsyncGraphDatabase, AsyncDriver
from app.core.config import settings

_driver: AsyncDriver | None = None


async def init_neo4j():
    global _driver
    _driver = AsyncGraphDatabase.driver(
        settings.neo4j_uri,
        auth=(settings.neo4j_user, settings.neo4j_password)
    )
    await _driver.verify_connectivity()


def get_driver() -> AsyncDriver:
    if _driver is None:
        raise RuntimeError("Neo4j driver not initialized")
    return _driver


async def run_query(cypher: str, params: dict = None) -> list[dict]:
    driver = get_driver()
    async with driver.session() as session:
        result = await session.run(cypher, params or {})
        return [record.data() async for record in result]


async def seed_graph():
    """Load seed.cypher into Neo4j. Run once on first start."""
    import os
    seed_path = "/var/lib/neo4j/import/seed.cypher"
    if not os.path.exists(seed_path):
        seed_path = "data/graph/seed.cypher"

    with open(seed_path) as f:
        statements = [s.strip() for s in f.read().split(";") if s.strip()]

    driver = get_driver()
    async with driver.session() as session:
        for stmt in statements:
            await session.run(stmt)
    print(f"Seeded {len(statements)} Cypher statements into Neo4j")
