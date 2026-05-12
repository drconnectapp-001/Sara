from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.postgres import init_db
from app.db.neo4j_client import init_neo4j
from app.api import chat, syllabus, practice, mock, analytics, formulas, mistakes, planner, auth, admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await init_neo4j()
    yield


app = FastAPI(
    title="Sara — JEE Companion API",
    version="0.1.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,      prefix="/api/auth",      tags=["auth"])
app.include_router(admin.router,     prefix="/api/admin",     tags=["admin"])
app.include_router(chat.router,      prefix="/api/chat",      tags=["chat"])
app.include_router(syllabus.router,  prefix="/api/syllabus",  tags=["syllabus"])
app.include_router(practice.router,  prefix="/api/practice",  tags=["practice"])
app.include_router(mock.router,      prefix="/api/mock",      tags=["mock"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(formulas.router,  prefix="/api/formulas",  tags=["formulas"])
app.include_router(mistakes.router,  prefix="/api/mistakes",  tags=["mistakes"])
app.include_router(planner.router,   prefix="/api/planner",   tags=["planner"])


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "sara-api"}
