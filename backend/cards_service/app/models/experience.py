from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from app.db.base import Base


class Experience(Base):
    __tablename__ = 'experiences'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    text: Mapped[str] = mapped_column(String(300))
    description: Mapped[str] = mapped_column(String(300))

    card_id: Mapped[int] = mapped_column(ForeignKey('cards.id'))

    card: Mapped["Card"] = relationship(
        "Card",
        back_populates="experiences",
    )