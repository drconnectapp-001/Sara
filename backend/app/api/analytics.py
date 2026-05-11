from fastapi import APIRouter, Depends
from sqlalchemy import text
from app.db.postgres import get_db

router = APIRouter()


@router.get("/")
async def get_analytics(db=Depends(get_db)):
    mock_scores = await _get_mock_scores(db)
    accuracy_by_subject = await _get_accuracy_by_subject(db)
    study_hours = await _get_study_hours(db)
    weak_concepts = await _get_weak_concepts(db)
    streak = await _get_streak(db)

    return {
        "mock_scores": mock_scores,
        "accuracy_by_subject": accuracy_by_subject,
        "study_hours_this_week": study_hours,
        "weak_concepts": weak_concepts,
        "current_streak": streak,
    }


async def _get_mock_scores(db) -> list:
    result = await db.execute(text("""
        SELECT score, physics_score, chemistry_score, math_score,
               total_questions, taken_at
        FROM sara_mock_scores
        ORDER BY taken_at DESC LIMIT 10
    """))
    return [dict(r._mapping) for r in result.fetchall()]


async def _get_accuracy_by_subject(db) -> dict:
    result = await db.execute(text("""
        SELECT subject, AVG(accuracy) AS avg_accuracy
        FROM sara_concept_accuracy
        GROUP BY subject
    """))
    return {r.subject: float(r.avg_accuracy or 0) for r in result.fetchall()}


async def _get_study_hours(db) -> float:
    from datetime import datetime, timedelta
    result = await db.execute(text("""
        SELECT COALESCE(SUM(duration_minutes) / 60.0, 0) AS hours
        FROM sara_study_sessions
        WHERE started_at >= :week_ago
    """), {"week_ago": datetime.utcnow() - timedelta(days=7)})
    row = result.fetchone()
    return float(row.hours if row else 0)


async def _get_weak_concepts(db) -> list:
    result = await db.execute(text("""
        SELECT concept_name, subject, accuracy
        FROM sara_concept_accuracy
        WHERE accuracy < 0.60
        ORDER BY accuracy ASC
        LIMIT 5
    """))
    return [dict(r._mapping) for r in result.fetchall()]


async def _get_streak(db) -> int:
    result = await db.execute(text("""
        SELECT current_streak FROM sara_profile WHERE id = 'sara'
    """))
    row = result.fetchone()
    return int(row.current_streak if row else 0)
