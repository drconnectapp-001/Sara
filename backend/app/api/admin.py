"""
Admin API — inject and manage Sara's personal data.
This is how you personalise the companion.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import text
from app.db.postgres import SessionLocal

router = APIRouter()


class SaraProfileUpdate(BaseModel):
    name:              Optional[str]   = None
    target_college:    Optional[str]   = None
    target_score:      Optional[int]   = None
    class_level:       Optional[int]   = None
    weak_subjects:     Optional[list[str]] = None
    strong_subjects:   Optional[list[str]] = None
    motivation_style:  Optional[str]   = None
    current_mood:      Optional[str]   = None


class MoodUpdate(BaseModel):
    mood:    str
    trigger: Optional[str] = None


class MemoryCreate(BaseModel):
    content:          str
    memory_type:      str = "statement"   # statement | achievement | struggle
    related_concepts: Optional[list[str]] = []


@router.get("/sara")
async def get_sara_profile():
    """Get Sara's full profile."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT name, target_college, target_score, class_level,
                   weak_subjects, strong_subjects, motivation_style,
                   current_mood, current_streak, longest_streak, total_study_hours
            FROM sara_profile WHERE id = 'sara'
        """))
        row = result.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Sara profile not found")
        return {
            "name":             row.name,
            "target_college":   row.target_college,
            "target_score":     row.target_score,
            "class_level":      row.class_level,
            "weak_subjects":    row.weak_subjects or [],
            "strong_subjects":  row.strong_subjects or [],
            "motivation_style": row.motivation_style,
            "current_mood":     row.current_mood,
            "current_streak":   row.current_streak,
            "longest_streak":   row.longest_streak,
            "total_study_hours": row.total_study_hours,
        }


@router.patch("/sara")
async def update_sara_profile(update: SaraProfileUpdate):
    """Update Sara's profile — any field."""
    fields = {k: v for k, v in update.model_dump().items() if v is not None}
    if not fields:
        raise HTTPException(status_code=400, detail="No fields to update")

    set_clause = ", ".join(f"{k} = :{k}" for k in fields)
    async with SessionLocal() as db:
        await db.execute(
            text(f"UPDATE sara_profile SET {set_clause} WHERE id = 'sara'"),
            fields
        )
        await db.commit()
    return {"updated": list(fields.keys())}


@router.post("/sara/mood")
async def set_mood(update: MoodUpdate):
    """Update Sara's current mood and log it to timeline."""
    async with SessionLocal() as db:
        await db.execute(text("""
            UPDATE sara_profile SET current_mood = :mood WHERE id = 'sara'
        """), {"mood": update.mood})
        await db.execute(text("""
            INSERT INTO sara_emotional_timeline (detected_mood, trigger_reason)
            VALUES (:mood, :trigger)
        """), {"mood": update.mood, "trigger": update.trigger})
        await db.commit()
    return {"mood": update.mood}


@router.post("/sara/memory")
async def add_memory(memory: MemoryCreate):
    """Inject a key memory about Sara into the companion's context."""
    async with SessionLocal() as db:
        await db.execute(text("""
            INSERT INTO sara_key_memories (content, memory_type, related_concepts)
            VALUES (:content, :type, :concepts)
        """), {
            "content":  memory.content,
            "type":     memory.memory_type,
            "concepts": memory.related_concepts
        })
        await db.commit()
    return {"stored": memory.content}


@router.get("/sara/memories")
async def get_memories():
    """Get all stored memories about Sara."""
    async with SessionLocal() as db:
        result = await db.execute(text("""
            SELECT content, memory_type, related_concepts, created_at
            FROM sara_key_memories
            ORDER BY created_at DESC
            LIMIT 50
        """))
        rows = result.fetchall()
    return [
        {
            "content":  r.content,
            "type":     r.memory_type,
            "concepts": r.related_concepts,
            "at":       str(r.created_at)
        }
        for r in rows
    ]


@router.delete("/sara/memories")
async def clear_memories():
    """Clear all key memories (use with care)."""
    async with SessionLocal() as db:
        await db.execute(text("DELETE FROM sara_key_memories"))
        await db.commit()
    return {"cleared": True}
