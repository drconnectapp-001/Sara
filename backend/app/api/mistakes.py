"""
Mistake Patterns API — track and surface Sara's recurring errors.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import text
from app.db.postgres import SessionLocal

router = APIRouter()


class MistakeLog(BaseModel):
    concept_name:        str
    pattern_description: str


@router.get("/")
async def get_mistakes(subject: Optional[str] = None, limit: int = 20):
    """Get Sara's top recurring mistake patterns."""
    async with SessionLocal() as db:
        if subject:
            result = await db.execute(text("""
                SELECT concept_name, pattern_description, frequency, last_seen_at
                FROM sara_mistake_patterns
                WHERE concept_name IN (
                    SELECT concept_name FROM sara_concept_accuracy WHERE subject = :subject
                )
                ORDER BY frequency DESC
                LIMIT :limit
            """), {"subject": subject, "limit": limit})
        else:
            result = await db.execute(text("""
                SELECT concept_name, pattern_description, frequency, last_seen_at
                FROM sara_mistake_patterns
                ORDER BY frequency DESC
                LIMIT :limit
            """), {"limit": limit})
        rows = result.fetchall()
    return [
        {
            "concept":   r.concept_name,
            "pattern":   r.pattern_description,
            "frequency": r.frequency,
            "last_seen": str(r.last_seen_at)
        }
        for r in rows
    ]


@router.post("/")
async def log_mistake(mistake: MistakeLog):
    """Log a mistake. If same pattern exists, increment frequency."""
    async with SessionLocal() as db:
        await db.execute(text("""
            INSERT INTO sara_mistake_patterns (concept_name, pattern_description, frequency)
            VALUES (:concept, :pattern, 1)
            ON CONFLICT (concept_name, pattern_description)
            DO UPDATE SET
                frequency    = sara_mistake_patterns.frequency + 1,
                last_seen_at = NOW()
        """), {"concept": mistake.concept_name, "pattern": mistake.pattern_description})
        await db.commit()
    return {"logged": True}


@router.get("/summary")
async def get_mistake_summary():
    """Top 5 concepts Sara keeps getting wrong — for dashboard."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT concept_name, SUM(frequency) as total_errors
            FROM sara_mistake_patterns
            GROUP BY concept_name
            ORDER BY total_errors DESC
            LIMIT 5
        """))
        rows = result.fetchall()
    return [{"concept": r.concept_name, "errors": int(r.total_errors)} for r in rows]
