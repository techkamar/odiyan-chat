from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from model.user import CreateUser
from service.data_service import DataService

user_router = APIRouter(prefix="/api/user")

@user_router.post("")
def register_user(user_data:CreateUser):
    if not DataService.check_user_exists(user_data.username):
        DataService.add_new_user(user_data)
        return JSONResponse(status_code=201, content={"message": "User Created Successfully"})
    else:
        return JSONResponse(status_code=500, content={"message": "Username is already taken. Try another username for registration"})