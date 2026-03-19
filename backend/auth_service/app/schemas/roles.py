from enum import Enum
from pydantic import BaseModel


class UserRole(str, Enum):
    ADMIN = "admin"
    CLIENT = "client"


class UserPayload(BaseModel):
    user_id: int
    email: str
    role: UserRole
