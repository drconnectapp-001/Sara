"""
Mock Test API — log and retrieve Sara's mock test performance.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import text
from app.db.postgres import SessionLocal

router = APIRouter()


class MockScoreCreate(BaseModel):
    score:           int
    physics_score:   Optional[int] = None
    chemistry_score: Optional[int] = None
    math_score:      Optional[int] = None
    attempted:       Optional[int] = None
    correct:         Optional[int] = None
    test_type:       str = "full_mock"


@router.get("/")
async def get_mock_scores(limit: int = 10):
    """Get Sara's recent mock test history."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT score, physics_score, chemistry_score, math_score,
                   attempted, correct, test_type, taken_at
            FROM sara_mock_scores
            ORDER BY taken_at DESC
            LIMIT :limit
        """), {"limit": limit})
        rows = result.fetchall()
    return [
        {
            "score":           r.score,
            "physics_score":   r.physics_score,
            "chemistry_score": r.chemistry_score,
            "math_score":      r.math_score,
            "attempted":       r.attempted,
            "correct":         r.correct,
            "test_type":       r.test_type,
            "taken_at":        str(r.taken_at)
        }
        for r in rows
    ]


@router.post("/")
async def log_mock_score(mock: MockScoreCreate):
    """Log a new mock test result."""
    async with SessionLocal() as db:
        await db.execute(text("""
            INSERT INTO sara_mock_scores
                (score, physics_score, chemistry_score, math_score,
                 attempted, correct, test_type)
            VALUES
                (:score, :phy, :chem, :math, :attempted, :correct, :test_type)
        """), {
            "score":     mock.score,
            "phy":       mock.physics_score,
            "chem":      mock.chemistry_score,
            "math":      mock.math_score,
            "attempted": mock.attempted,
            "correct":   mock.correct,
            "test_type": mock.test_type
        })
        await db.commit()
    return {"logged": True, "score": mock.score}


@router.get("/trend")
async def get_score_trend():
    """Score trend over last 10 mocks — for graph."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT score, physics_score, chemistry_score, math_score, taken_at
            FROM sara_mock_scores
            ORDER BY taken_at ASC
            LIMIT 10
        """))
        rows = result.fetchall()
    return [
        {
            "score":    r.score,
            "physics":  r.physics_score,
            "chemistry": r.chemistry_score,
            "math":     r.math_score,
            "date":     str(r.taken_at.date())
        }
        for r in rows
    ]
