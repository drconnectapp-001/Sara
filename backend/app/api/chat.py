from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.rag.pipeline import run_pipeline

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"


@router.post("/")
async def chat(req: ChatRequest):
    """
    Main companion chat endpoint. Streams Claude's response.
    """
    async def generator():
        async for chunk in run_pipeline(req.message, req.session_id):
            yield f"data: {chunk}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generator(), media_type="text/event-stream")
