from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)

    text: Mapped[str] = mapped_column(String(400))
    description: Mapped[str] = mapped_column(String(1000))

    card_id: Mapped[int] = mapped_column(ForeignKey("cards.id"))

    card: Mapped["Card"] = relationship(
        "Card",
        back_populates="projects",
    )
