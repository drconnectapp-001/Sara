"""
Formulas API — quick formula lookup from the wiki knowledge base.
"""
from fastapi import APIRouter
from typing import Optional
from sqlalchemy import text
from app.db.postgres import SessionLocal

router = APIRouter()


@router.get("/")
async def get_formulas(subject: Optional[str] = None, concept: Optional[str] = None):
    """
    Get formulas from wiki chunks.
    Searches section headings that contain formula-like content.
    """
    async with SessionLocal() as db:
        filters = ["section_heading ILIKE '%formula%' OR content ILIKE '%formula%' OR content ILIKE '$$'"]
        params: dict = {}

        if subject:
            filters.append("subject = :subject")
            params["subject"] = subject

        if concept:
            filters.append("concept_name ILIKE :concept")
            params["concept"] = f"%{concept}%"

        where = " AND ".join(filters)
        result = await db.execute(text(f"""
            SELECT concept_name, subject, section_heading, content
            FROM wiki_chunks
            WHERE {where}
            ORDER BY subject, concept_name
            LIMIT 30
        """), params)
        rows = result.fetchall()

    return [
        {
            "concept": r.concept_name,
            "subject": r.subject,
            "section": r.section_heading,
            "content": r.content[:600]
        }
        for r in rows
    ]


@router.get("/by-concept/{concept_name}")
async def get_formulas_for_concept(concept_name: str):
    """Get all formula chunks for a specific concept."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT section_heading, content, subject
            FROM wiki_chunks
            WHERE concept_name ILIKE :concept
            ORDER BY section_heading
        """), {"concept": f"%{concept_name}%"})
        rows = result.fetchall()
    return [
        {
            "section": r.section_heading,
            "content": r.content,
            "subject": r.subject
        }
        for r in rows
    ]
