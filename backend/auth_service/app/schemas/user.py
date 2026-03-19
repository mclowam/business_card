from pydantic import BaseModel, EmailStr
from typing import Optional
from app.schemas.roles import UserRole


class UserCreateSchema(BaseModel):
    email: EmailStr
    password: str


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = 'bearer'


class RefreshTokenSchema(BaseModel):
    refresh_token: str


class UserReadSchema(BaseModel):
    id: int
    email: EmailStr
    role: UserRole
    is_active: bool

    class Config:
        from_attributes = True