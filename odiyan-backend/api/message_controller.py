from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse
from model.message import CreateMessage, ClearConversation
from service.data_service import DataService

message_router = APIRouter(prefix="/api/message")

@message_router.post("")
def create_message(request: Request, message:CreateMessage):
    decoded_jwt = DataService.decode_user_jwt(request.cookies.get("Authorization"))

    # Check existence of delivering user
    if not DataService.check_user_exists(message.recipient_user):
        return JSONResponse(status_code=500,content={"message":f"User {message.recipient_user} doesnt exist"})
    
    DataService.add_message(message.recipient_user, decoded_jwt['username'], message.message_content_json)


@message_router.get("s")
def get_all_messages(request: Request):
    decoded_jwt = DataService.decode_user_jwt(request.cookies.get("Authorization"))
    return DataService.get_all_messages(decoded_jwt['username'])


@message_router.post("/delete-conversation")
def claer_conversation_with_one_one_user(request: Request, clear_convo: ClearConversation):
    decoded_jwt = DataService.decode_user_jwt(request.cookies.get("Authorization"))
    return DataService.delete_individual_converstaion(decoded_jwt['username'],clear_convo.other_user)