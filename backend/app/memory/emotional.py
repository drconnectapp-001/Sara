"""
Detects Sara's emotional state from behavioral signals.
Called after every session update.
"""
from datetime import datetime, timedelta
from sqlalchemy import text


async def detect_emotional_state(db) -> str:
    """
    Returns: 'burnt_out' | 'high_confidence' | 'exam_anxiety' | 'frustrated' | 'neutral'
    """
    signals = await _gather_signals(db)

    if signals["study_hours_today"] > 8 or signals["score_trend"] < -20:
        return "burnt_out"

    if signals["accuracy_trend"] > 10 and signals["streak_days"] > 7:
        return "high_confidence"

    if signals["days_to_jee"] < 30:
        return "exam_anxiety"

    if signals["wrong_in_last_30min"] >= 3:
        return "frustrated"

    return "neutral"


async def _gather_signals(db) -> dict:
    today = datetime.utcnow().date()

    # Hours studied today
    hours_result = await db.execute(text("""
        SELECT COALESCE(SUM(duration_minutes) / 60.0, 0) AS hours
        FROM sara_study_sessions
        WHERE DATE(started_at) = :today
    """), {"today": today})
    hours_today = float((hours_result.fetchone() or [0]).hours or 0)

    # Mock score trend (last 2 weeks vs previous 2 weeks)
    trend_result = await db.execute(text("""
        SELECT score, taken_at FROM sara_mock_scores
        ORDER BY taken_at DESC LIMIT 10
    """))
    scores = trend_result.fetchall()
    score_trend = 0
    if len(scores) >= 2:
        score_trend = scores[0].score - scores[-1].score

    # Accuracy trend last 7 days
    acc_result = await db.execute(text("""
        SELECT AVG(accuracy) AS avg FROM sara_concept_accuracy
        WHERE updated_at >= :week_ago
    """), {"week_ago": datetime.utcnow() - timedelta(days=7)})
    acc_row = acc_result.fetchone()
    accuracy_trend = float(acc_row.avg or 0) * 100 - 50  # delta from baseline

    # Streak days
    streak_result = await db.execute(text("""
        SELECT current_streak FROM sara_profile WHERE id = 'sara'
    """))
    streak_row = streak_result.fetchone()
    streak_days = int(streak_row.current_streak if streak_row else 0)

    # Wrong answers in last 30 minutes
    wrong_result = await db.execute(text("""
        SELECT COUNT(*) AS cnt FROM sara_practice_attempts
        WHERE is_correct = false
          AND attempted_at >= :thirty_min_ago
    """), {"thirty_min_ago": datetime.utcnow() - timedelta(minutes=30)})
    wrong_row = wrong_result.fetchone()
    wrong_recent = int(wrong_row.cnt if wrong_row else 0)

    # Days to JEE (approximate — April 2027 Session 1)
    jee_date = datetime(2027, 4, 1).date()
    days_to_jee = (jee_date - today).days

    return {
        "study_hours_today": hours_today,
        "score_trend": score_trend,
        "accuracy_trend": accuracy_trend,
        "streak_days": streak_days,
        "wrong_in_last_30min": wrong_recent,
        "days_to_jee": days_to_jee,
    }
