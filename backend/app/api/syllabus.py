from fastapi import APIRouter, Depends
from sqlalchemy import text
from app.db.postgres import get_db

router = APIRouter()


@router.get("/")
async def get_syllabus(db=Depends(get_db)):
    result = await db.execute(text("""
        SELECT c.id, c.name, c.subject, c.class_level, c.jee_weightage_pct,
               COALESCE(p.status, 'not_started') AS status,
               p.last_studied_at, p.confidence_level
        FROM jee_chapters c
        LEFT JOIN sara_chapter_progress p ON p.chapter_id = c.id
        ORDER BY c.subject, c.class_level, c.display_order
    """))
    rows = result.fetchall()
    chapters = [dict(r._mapping) for r in rows]

    # Group by subject
    grouped = {}
    for ch in chapters:
        subj = ch["subject"]
        grouped.setdefault(subj, []).append(ch)

    return {"syllabus": grouped}


@router.patch("/{chapter_id}")
async def update_chapter_status(chapter_id: str, body: dict, db=Depends(get_db)):
    status = body.get("status")
    confidence = body.get("confidence_level")

    await db.execute(text("""
        INSERT INTO sara_chapter_progress (chapter_id, status, confidence_level, last_studied_at)
        VALUES (:cid, :status, :conf, NOW())
        ON CONFLICT (chapter_id) DO UPDATE
        SET status = :status,
            confidence_level = :conf,
            last_studied_at = NOW()
    """), {"cid": chapter_id, "status": status, "conf": confidence})

    await db.commit()
    return {"ok": True}
