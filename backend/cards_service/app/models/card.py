from typing import List
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base


class Card(Base):
    __tablename__ = 'cards'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    user_id: Mapped[int] = mapped_column(Integer)
    first_name: Mapped[str] = mapped_column(String(250))
    last_name: Mapped[str] = mapped_column(String(250))
    profession: Mapped[str] = mapped_column(String(300))
    text: Mapped[str] = mapped_column(String(500))
    about_user: Mapped[str] = mapped_column(String(3000))
    avatar_key: Mapped[str | None] = mapped_column(String(500), nullable=True, default=None)

    user_occupations: Mapped[List["UserOccupation"]] = relationship(
        "UserOccupation",
        back_populates="card",
        cascade="all, delete-orphan",
    )

    skills: Mapped[List["Skills"]] = relationship(
        "Skills",
        back_populates="card",
        cascade="all, delete-orphan",
    )

    experiences: Mapped[List["Experience"]] = relationship(
        "Experience",
        back_populates="card",
        cascade="all, delete-orphan",
    )

    projects: Mapped[List["Project"]] = relationship(
        "Project",
        back_populates="card",
        cascade="all, delete-orphan",
    )
