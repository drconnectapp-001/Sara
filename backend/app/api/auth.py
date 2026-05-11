from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy import text
from app.core.config import settings
from app.db.postgres import get_db

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class LoginRequest(BaseModel):
    password: str


@router.post("/login")
async def login(req: LoginRequest, db=Depends(get_db)):
    result = await db.execute(text(
        "SELECT password_hash FROM sara_profile WHERE id = 'sara'"
    ))
    row = result.fetchone()
    if not row or not pwd_context.verify(req.password, row.password_hash):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = jwt.encode(
        {"sub": "sara", "exp": datetime.utcnow() + timedelta(minutes=settings.jwt_expire_minutes)},
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )
    return {"access_token": token, "token_type": "bearer"}
