from pydantic import BaseModel, Field

class CreateUser(BaseModel):
    username: str = Field(min_length=3, max_length=20)
    password: str
    confirm_password: str