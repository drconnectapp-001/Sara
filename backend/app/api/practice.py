"""
Practice API — serve concept questions and track Sara's attempts.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import text
from app.db.postgres import SessionLocal

router = APIRouter()


class PracticeAttempt(BaseModel):
    concept_name: str
    subject:      str
    is_correct:   bool
    time_taken_sec: Optional[int] = None


@router.get("/")
async def get_practice_concepts(subject: Optional[str] = None):
    """Get concepts available for practice from the wiki."""
    async with SessionLocal() as db:
        if subject:
            result = await db.execute(text("""
                SELECT DISTINCT concept_name, subject
                FROM wiki_chunks
                WHERE subject = :subject
                ORDER BY concept_name
            """), {"subject": subject})
        else:
            result = await db.execute(text("""
                SELECT DISTINCT concept_name, subject
                FROM wiki_chunks
                ORDER BY subject, concept_name
            """))
        rows = result.fetchall()
    return [{"concept": r.concept_name, "subject": r.subject} for r in rows]


@router.post("/attempt")
async def log_attempt(attempt: PracticeAttempt):
    """Log a practice attempt and update concept accuracy."""
    async with SessionLocal() as db:
        # Log the attempt
        await db.execute(text("""
            INSERT INTO sara_practice_attempts
                (problem_neo4j_id, is_correct, time_taken_sec, subject)
            VALUES (:concept, :correct, :time, :subject)
        """), {
            "concept": attempt.concept_name,
            "correct": attempt.is_correct,
            "time":    attempt.time_taken_sec,
            "subject": attempt.subject
        })

        # Update concept accuracy
        await db.execute(text("""
            INSERT INTO sara_concept_accuracy (concept_name, subject, correct, total, accuracy)
            VALUES (:concept, :subject, :c, 1, :acc)
            ON CONFLICT (concept_name) DO UPDATE SET
                correct    = sara_concept_accuracy.correct + :c,
                total      = sara_concept_accuracy.total + 1,
                accuracy   = (sara_concept_accuracy.correct + :c)::float
                             / (sara_concept_accuracy.total + 1),
                updated_at = NOW()
        """), {
            "concept": attempt.concept_name,
            "subject": attempt.subject,
            "c":       1 if attempt.is_correct else 0,
            "acc":     1.0 if attempt.is_correct else 0.0
        })
        await db.commit()
    return {"logged": True}


@router.get("/accuracy")
async def get_accuracy(subject: Optional[str] = None):
    """Get Sara's accuracy per concept."""
    async with SessionLocal() as db:
        if subject:
            result = await db.execute(text("""
                SELECT concept_name, subject, correct, total, accuracy
                FROM sara_concept_accuracy
                WHERE subject = :subject
                ORDER BY accuracy ASC
            """), {"subject": subject})
        else:
            result = await db.execute(text("""
                SELECT concept_name, subject, correct, total, accuracy
                FROM sara_concept_accuracy
                ORDER BY accuracy ASC
            """))
        rows = result.fetchall()
    return [
        {
            "concept":  r.concept_name,
            "subject":  r.subject,
            "correct":  r.correct,
            "total":    r.total,
            "accuracy": round(float(r.accuracy) * 100, 1)
        }
        for r in rows
    ]
