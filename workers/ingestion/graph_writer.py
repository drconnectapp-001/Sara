"""
Graph Writer — writes extracted knowledge into Neo4j.

Takes output from concept_extractor and writes:
  - Concept nodes (with all properties)
  - Formula nodes (linked to concepts)
  - CommonMistake nodes
  - REQUIRES edges (prerequisites)
  - CONFUSED_WITH edges
  - BRIDGES_TO edges (cross-subject)
  - Problem nodes (from NCERT examples)

Uses MERGE so it's safe to re-run — won't create duplicates.
"""

import uuid
import asyncio
from neo4j import AsyncGraphDatabase


class GraphWriter:

    def __init__(self, uri: str, user: str, password: str):
        self.driver = AsyncGraphDatabase.driver(uri, auth=(user, password))

    async def close(self):
        await self.driver.close()

    async def write_chapter(
        self,
        chapter_meta: dict,
        section_results: list[dict],
        problem_results: list[dict]
    ):
        """Write all extracted data for one chapter into Neo4j."""
        async with self.driver.session() as session:
            # Ensure chapter node exists
            await session.run("""
                MERGE (ch:Chapter {id: $id})
                SET ch.name = $name,
                    ch.subject = $subject,
                    ch.class_level = 11,
                    ch.jee_weightage_pct = $weightage
                WITH ch
                MATCH (s:Subject {id: $subject_id})
                MERGE (ch)-[:IN_SUBJECT]->(s)
            """, {
                "id": chapter_meta["neo4j_id"],
                "name": chapter_meta["name"],
                "subject": chapter_meta["subject"],
                "subject_id": chapter_meta["subject"].lower(),
                "weightage": chapter_meta.get("jee_weightage", 0),
            })

            # Write all concepts and formulas from each section
            for section in section_results:
                await self._write_section(session, section, chapter_meta)

            # Write problems from NCERT examples
            for problem in problem_results:
                await self._write_problem(session, problem, chapter_meta)

        print(f"  [Neo4j] {chapter_meta['name']}: "
              f"{sum(len(s.get('concepts', [])) for s in section_results)} concepts, "
              f"{len(problem_results)} problems written")

    async def _write_section(self, session, section: dict, chapter_meta: dict):
        """Write concepts, formulas, and relationships for one section."""
        chapter_id = chapter_meta["neo4j_id"]
        subject = chapter_meta["subject"]

        for concept in section.get("concepts", []):
            if not concept.get("name"):
                continue

            concept_id = _make_id(chapter_id, concept["name"])

            # Write concept node
            await session.run("""
                MERGE (c:Concept {id: $id})
                SET c.name = $name,
                    c.description = $definition,
                    c.difficulty = $difficulty,
                    c.jee_importance = $jee_importance,
                    c.subject = $subject,
                    c.key_facts = $key_facts
                WITH c
                MATCH (ch:Chapter {id: $chapter_id})
                MERGE (c)-[:IN_CHAPTER]->(ch)
            """, {
                "id": concept_id,
                "name": concept["name"],
                "definition": concept.get("definition", ""),
                "difficulty": concept.get("difficulty", "medium"),
                "jee_importance": concept.get("jee_importance", "medium"),
                "subject": subject,
                "key_facts": concept.get("key_facts", []),
                "chapter_id": chapter_id,
            })

            # Write REQUIRES edges (prerequisites)
            for prereq_name in concept.get("prerequisites", []):
                if prereq_name:
                    await session.run("""
                        MATCH (c:Concept {id: $concept_id})
                        MERGE (prereq:Concept {name: $prereq_name})
                        MERGE (c)-[:REQUIRES]->(prereq)
                    """, {"concept_id": concept_id, "prereq_name": prereq_name})

            # Write CONFUSED_WITH edges
            for confused_name in concept.get("confused_with", []):
                if confused_name:
                    await session.run("""
                        MATCH (c:Concept {id: $concept_id})
                        MERGE (cf:Concept {name: $confused_name})
                        MERGE (c)-[:CONFUSED_WITH]->(cf)
                    """, {"concept_id": concept_id, "confused_name": confused_name})

        # Write formulas
        for formula in section.get("formulas", []):
            if not formula.get("plain_text"):
                continue

            formula_id = _make_id(chapter_id, formula["plain_text"])
            concept_name = formula.get("concept", "")

            await session.run("""
                MERGE (f:Formula {id: $id})
                SET f.name = $name,
                    f.plain_text = $plain_text,
                    f.latex = $latex,
                    f.used_for = $used_for
                WITH f
                OPTIONAL MATCH (c:Concept {name: $concept_name})
                FOREACH (_ IN CASE WHEN c IS NOT NULL THEN [1] ELSE [] END |
                    MERGE (f)-[:DEFINES]->(c)
                )
            """, {
                "id": formula_id,
                "name": formula.get("name", formula["plain_text"]),
                "plain_text": formula["plain_text"],
                "latex": formula.get("latex", formula["plain_text"]),
                "used_for": formula.get("used_for", ""),
                "concept_name": concept_name,
            })

        # Write cross-subject bridges
        for link in section.get("cross_subject_links", []):
            if link.get("from_concept") and link.get("to_concept"):
                rel = link.get("relationship", "BRIDGES_TO")
                await session.run(f"""
                    MERGE (from:Concept {{name: $from_name}})
                    MERGE (to:Concept {{name: $to_name}})
                    MERGE (from)-[:{rel}]->(to)
                """, {
                    "from_name": link["from_concept"],
                    "to_name": link["to_concept"],
                })

        # Write common mistakes
        for mistake in section.get("common_mistakes", []):
            if not mistake.get("mistake"):
                continue
            mistake_id = str(uuid.uuid4())[:8]
            await session.run("""
                MERGE (m:CommonMistake {description: $description})
                SET m.pattern_tag = $tag
                WITH m
                OPTIONAL MATCH (c:Concept {name: $concept_name})
                FOREACH (_ IN CASE WHEN c IS NOT NULL THEN [1] ELSE [] END |
                    MERGE (m)-[:ABOUT]->(c)
                )
            """, {
                "description": mistake["mistake"],
                "tag": mistake.get("pattern_tag", "general"),
                "concept_name": mistake.get("concept", ""),
            })

    async def _write_problem(self, session, problem: dict, chapter_meta: dict):
        """Write a problem node from an NCERT example."""
        if not problem.get("problem_statement"):
            return

        problem_id = "ncert-" + str(uuid.uuid4())[:8]

        await session.run("""
            MERGE (p:Problem {id: $id})
            SET p.content = $content,
                p.solution_approach = $solution,
                p.difficulty = $difficulty,
                p.type = $ptype,
                p.is_pyq = false,
                p.source = 'NCERT'
            WITH p
            MATCH (ch:Chapter {id: $chapter_id})
            MERGE (p)-[:FROM_CHAPTER]->(ch)
        """, {
            "id": problem_id,
            "content": problem["problem_statement"],
            "solution": problem.get("solution_approach", ""),
            "difficulty": problem.get("difficulty", "medium"),
            "ptype": problem.get("problem_type", "theory"),
            "chapter_id": chapter_meta["neo4j_id"],
        })

        # Link problem to concepts it tests
        for concept_name in problem.get("concepts_tested", []):
            await session.run("""
                MATCH (p:Problem {id: $pid})
                MERGE (c:Concept {name: $cname})
                MERGE (p)-[:TESTS]->(c)
            """, {"pid": problem_id, "cname": concept_name})


def _make_id(chapter_id: str, name: str) -> str:
    """Generate a stable, collision-resistant ID from chapter + name."""
    slug = name.lower().replace(" ", "-").replace("/", "-")[:40]
    return f"{chapter_id}-{slug}"
