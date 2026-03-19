from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import mapped_column, Mapped

from app.db.base import Base

from app.schemas.roles import UserRole

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)

    is_staff: Mapped[bool] = mapped_column(Boolean, default=False)
    role: Mapped[str] = mapped_column(String, default=UserRole.CLIENT)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

