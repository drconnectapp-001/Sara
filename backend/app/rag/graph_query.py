"""
Neo4j graph traversal for the RAG pipeline.
Given concept names, returns the enriched concept neighborhood.
"""
from app.db.neo4j_client import run_query


NEIGHBORHOOD_QUERY = """
UNWIND $concepts AS concept_name
MATCH (c:Concept)
WHERE toLower(c.name) CONTAINS toLower(concept_name)

// Prerequisites (depth 1-2)
OPTIONAL MATCH (c)-[:REQUIRES*1..2]->(prereq:Concept)

// Co-occurring concepts in JEE questions
OPTIONAL MATCH (c)-[:APPEARS_WITH]->(co_concept:Concept)

// Concepts commonly confused with this one
OPTIONAL MATCH (c)-[:CONFUSED_WITH]->(confused:Concept)

// Problems that test this concept
OPTIONAL MATCH (p:Problem)-[:TESTS]->(c)

// Formulas that define this concept
OPTIONAL MATCH (f:Formula)-[:DEFINES]->(c)

// Sara's personal weak/strong signals on this concept
OPTIONAL MATCH (sara:Sara {id: 'sara'})-[weak:WEAK_ON]->(c)
OPTIONAL MATCH (sara)-[strong:STRONG_ON]->(c)

RETURN
  c.name AS concept,
  c.description AS description,
  collect(DISTINCT prereq.name) AS prerequisites,
  collect(DISTINCT co_concept.name) AS appears_with,
  collect(DISTINCT confused.name) AS confused_with,
  collect(DISTINCT {id: p.id, content: p.content, difficulty: p.difficulty, is_pyq: p.is_pyq}) AS problems,
  collect(DISTINCT {latex: f.latex, plain: f.plain_text}) AS formulas,
  weak IS NOT NULL AS sara_is_weak,
  strong IS NOT NULL AS sara_is_strong
"""


async def traverse_concept_neighborhood(concepts: list[str]) -> dict:
    if not concepts:
        return {"concepts": [], "problem_ids": [], "formulas": []}

    rows = await run_query(NEIGHBORHOOD_QUERY, {"concepts": concepts})

    all_concepts = []
    all_problem_ids = []
    all_formulas = []

    for row in rows:
        all_concepts.append({
            "name": row["concept"],
            "description": row["description"],
            "prerequisites": row["prerequisites"],
            "appears_with": row["appears_with"],
            "confused_with": row["confused_with"],
            "sara_is_weak": row["sara_is_weak"],
            "sara_is_strong": row["sara_is_strong"],
        })
        for p in row["problems"]:
            if p.get("id"):
                all_problem_ids.append(p["id"])
        all_formulas.extend(row["formulas"])

    return {
        "concepts": all_concepts,
        "problem_ids": list(set(all_problem_ids)),
        "formulas": all_formulas[:10],  # cap at 10 formulas
    }
