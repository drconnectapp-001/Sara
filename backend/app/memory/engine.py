"""
Sara's memory engine.
Retrieves personal context before every Claude call.
Updates memory after every response.
"""
from datetime import datetime, timedelta
from sqlalchemy import text
from app.db.postgres import SessionLocal
from app.memory.emotional import detect_emotional_state


async def retrieve_sara_memory(concept_cluster: list[str]) -> dict:
    async with SessionLocal() as db:
        profile = await _get_profile(db)
        emotional = await _get_emotional_state(db)
        academic = await _get_academic_context(db, concept_cluster)
        patterns = await _get_mistake_patterns(db, concept_cluster)
        memories = await _get_relevant_memories(db, concept_cluster)

    return {
        "profile": profile,
        "emotional": emotional,
        "academic": academic,
        "mistake_patterns": patterns,
        "relevant_memories": memories,
    }


async def update_sara_memory(message: str, response: str, concepts: list[str]):
    async with SessionLocal() as db:
        # Log the doubt to history
        await db.execute(text("""
            INSERT INTO doubt_history (sara_query, response_summary, concepts, created_at)
            VALUES (:query, :response, :concepts, :now)
        """), {
            "query": message,
            "response": response[:500],
            "concepts": concepts,
            "now": datetime.utcnow()
        })

        # Update emotional state based on new signal
        new_state = await detect_emotional_state(db)
        await db.execute(text("""
            UPDATE sara_profile SET current_mood = :mood WHERE id = 'sara'
        """), {"mood": new_state})

        await db.commit()


async def _get_profile(db) -> dict:
    result = await db.execute(text("""
        SELECT name, target_college, target_score, weak_subjects,
               strong_subjects, motivation_style, current_mood
        FROM sara_profile WHERE id = 'sara'
    """))
    row = result.fetchone()
    if not row:
        return {}
    return {
        "name": row.name,
        "target_college": row.target_college,
        "target_score": row.target_score,
        "weak_subjects": row.weak_subjects or [],
        "strong_subjects": row.strong_subjects or [],
        "motivation_style": row.motivation_style,
        "current_mood": row.current_mood,
    }


async def _get_emotional_state(db) -> dict:
    result = await db.execute(text("""
        SELECT detected_mood, trigger_reason, created_at
        FROM sara_emotional_timeline
        ORDER BY created_at DESC
        LIMIT 5
    """))
    rows = result.fetchall()
    if not rows:
        return {"current_mood": "neutral", "days_in_mood": 0}

    latest = rows[0]
    mood = latest.detected_mood

    # Count how many consecutive days in this mood
    days_in_mood = 0
    for row in rows:
        if row.detected_mood == mood:
            days_in_mood += 1
        else:
            break

    return {
        "current_mood": mood,
        "days_in_mood": days_in_mood,
        "trigger": latest.trigger_reason,
    }


async def _get_academic_context(db, concepts: list[str]) -> dict:
    if not concepts:
        return {}

    result = await db.execute(text("""
        SELECT AVG(accuracy) AS avg_accuracy,
               COUNT(*) AS total_attempts,
               MAX(updated_at) AS last_activity
        FROM sara_concept_accuracy
        WHERE concept_name = ANY(:concepts)
    """), {"concepts": concepts})
    row = result.fetchone()

    # Mock score trend
    trend_result = await db.execute(text("""
        SELECT score FROM sara_mock_scores
        ORDER BY taken_at DESC LIMIT 5
    """))
    scores = [r.score for r in trend_result.fetchall()]
    score_trend = (scores[0] - scores[-1]) if len(scores) >= 2 else 0

    return {
        "accuracy_on_cluster": float(row.avg_accuracy or 0),
        "times_asked_similar": int(row.total_attempts or 0),
        "last_studied": str(row.last_activity.date()) if row.last_activity else None,
        "mock_score_trend": score_trend,
    }


async def _get_mistake_patterns(db, concepts: list[str]) -> list[dict]:
    if not concepts:
        return []
    result = await db.execute(text("""
        SELECT pattern_description, frequency
        FROM sara_mistake_patterns
        WHERE concept_name = ANY(:concepts)
        ORDER BY frequency DESC
        LIMIT 3
    """), {"concepts": concepts})
    return [{"pattern": r.pattern_description, "frequency": r.frequency}
            for r in result.fetchall()]


async def _get_relevant_memories(db, concepts: list[str]) -> list[str]:
    result = await db.execute(text("""
        SELECT content FROM sara_key_memories
        WHERE related_concepts && :concepts
        ORDER BY created_at DESC
        LIMIT 3
    """), {"concepts": concepts})
    return [r.content for r in result.fetchall()]
