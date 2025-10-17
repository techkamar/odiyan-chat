from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
auth_router = APIRouter(prefix="/api/auth")

@auth_router.get("/me")
def meapi(request: Request):
    if request.cookies.get("Authorization") is None:
        return JSONResponse(status_code=401, content={"message":"User is not logged in"})