"""
Study Planner API — daily schedule and study session tracking.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from sqlalchemy import text
from app.db.postgres import SessionLocal

router = APIRouter()


class StudySessionCreate(BaseModel):
    subject:          str
    chapter_id:       Optional[str] = None
    duration_minutes: int
    started_at:       Optional[str] = None


@router.get("/")
async def get_study_summary():
    """Sara's study summary — hours per subject, this week."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT subject,
                   SUM(duration_minutes) AS total_minutes,
                   COUNT(*) AS sessions
            FROM sara_study_sessions
            WHERE started_at >= NOW() - INTERVAL '7 days'
            GROUP BY subject
            ORDER BY total_minutes DESC
        """))
        rows = result.fetchall()

        total = await db.execute(text("""
            SELECT COALESCE(SUM(duration_minutes), 0) AS total
            FROM sara_study_sessions
            WHERE started_at >= NOW() - INTERVAL '7 days'
        """))
        total_row = total.fetchone()

    return {
        "week_total_minutes": int(total_row.total),
        "by_subject": [
            {
                "subject":        r.subject,
                "total_minutes":  int(r.total_minutes),
                "sessions":       int(r.sessions)
            }
            for r in rows
        ]
    }


@router.post("/session")
async def log_study_session(session: StudySessionCreate):
    """Log a completed study session."""
    started = datetime.fromisoformat(session.started_at) if session.started_at else datetime.utcnow()
    async with SessionLocal() as db:
        await db.execute(text("""
            INSERT INTO sara_study_sessions
                (subject, chapter_id, duration_minutes, started_at, ended_at)
            VALUES (:subject, :chapter, :duration, :started, NOW())
        """), {
            "subject":  session.subject,
            "chapter":  session.chapter_id,
            "duration": session.duration_minutes,
            "started":  started
        })
        # Update total study hours on profile
        await db.execute(text("""
            UPDATE sara_profile
            SET total_study_hours = total_study_hours + :hours
            WHERE id = 'sara'
        """), {"hours": session.duration_minutes / 60})
        await db.commit()
    return {"logged": True, "minutes": session.duration_minutes}


@router.get("/sessions")
async def get_recent_sessions(limit: int = 20):
    """Get recent study sessions."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT subject, chapter_id, duration_minutes, started_at
            FROM sara_study_sessions
            ORDER BY started_at DESC
            LIMIT :limit
        """), {"limit": limit})
        rows = result.fetchall()
    return [
        {
            "subject":   r.subject,
            "chapter":   r.chapter_id,
            "minutes":   r.duration_minutes,
            "started_at": str(r.started_at)
        }
        for r in rows
    ]


@router.get("/weak-areas")
async def get_weak_areas():
    """Concepts with lowest accuracy — Sara should focus here."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT concept_name, subject, accuracy, total
            FROM sara_concept_accuracy
            WHERE total >= 3
            ORDER BY accuracy ASC
            LIMIT 5
        """))
        rows = result.fetchall()
    return [
        {
            "concept":  r.concept_name,
            "subject":  r.subject,
            "accuracy": round(float(r.accuracy) * 100, 1),
            "attempts": r.total
        }
        for r in rows
    ]
