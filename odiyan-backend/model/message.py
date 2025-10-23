from pydantic import BaseModel

class CreateMessage(BaseModel):
    recipient_user : str
    message_content_json : dict
