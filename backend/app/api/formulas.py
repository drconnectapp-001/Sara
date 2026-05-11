from fastapi import APIRouter
router = APIRouter()

# TODO: implement formulas endpoints — see ARCHITECTURE.md for full spec
@router.get("/")
async def placeholder():
    return {"status": "not yet implemented", "module": "formulas"}
