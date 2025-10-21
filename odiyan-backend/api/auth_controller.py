from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse
from model.user import LoginUser
from service.data_service import DataService

auth_router = APIRouter(prefix="/api/auth")

@auth_router.get("/me")
def meapi(request: Request):
    if request.cookies.get("Authorization") is None:
        return JSONResponse(status_code=401, content={"message":"User is not logged in"})
    else:
        # Decode the JWT and send back
        try:
            decoded_jwt = DataService.decode_user_jwt(request.cookies.get("Authorization"))
        except Exception as e:
            return JSONResponse(status_code=401, content={"message":str(e)})
        
        decoded_jwt.pop("exp")

        # Only Cookie exists but server is restarted.So user doesn't exist
        if not DataService.check_user_exists(decoded_jwt['username']):
            return JSONResponse(status_code=401, content={"message":"User is not logged in"})
        
        # Everything is OK. Return OK
        return JSONResponse(status_code=200, content=decoded_jwt)

@auth_router.post("/login")
def user_login(response: Response, user_data: LoginUser):
    login_success, message = DataService.validate_user_credential(user_data)
    if not login_success:
        return JSONResponse(status_code=500, content={'message':message})
    
    # Login Success. Set Cookie in Response
    # Payload for the JWT
    payload = {
        'username': str(user_data.username)
    }

    # Set Auth JWT token in Cookie
    user_jwt = DataService.encode_user_jwt(payload)
    response.set_cookie(
        key="Authorization",
        value=user_jwt,
        max_age=3600,  # 1 hour
        httponly=True,
        secure=True,
        samesite="Strict"
    )
    return f"User [{user_data.username}] is now logged in..."

@auth_router.get("/logout")
def user_logout(response: Response):
    response.delete_cookie(key="Authorization")