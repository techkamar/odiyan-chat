from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from model.user import CreateUser, SearchUser
from service.data_service import DataService

user_router = APIRouter(prefix="/api/user")

@user_router.post("")
def register_user(user_data:CreateUser):
    if user_data.password!=user_data.confirm_password:
        return JSONResponse(status_code=500, content={"message": "Password and Confirm Password is not matching"})
    
    if not DataService.check_user_exists(user_data.username):
        DataService.add_new_user(user_data)
        return JSONResponse(status_code=201, content={"message": "User Created Successfully"})
    else:
        return JSONResponse(status_code=500, content={"message": "Username is already taken. Try another username for registration"})

@user_router.post("/search")
def search_user(request: Request, search_user:SearchUser):
    decoded_jwt = DataService.decode_user_jwt(request.cookies.get("Authorization"))
    if decoded_jwt['username']==search_user.username:
        return JSONResponse(status_code=500, content={"message": "You cannot search yourselves"})
    
    if DataService.check_user_exists(search_user.username):
        return JSONResponse(status_code=200, content={"user_exists": True})
    else:
        return JSONResponse(status_code=200, content={"user_exists": False})
