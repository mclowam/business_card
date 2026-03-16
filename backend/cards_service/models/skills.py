from sqlalchemy.orm import mapped_column, Mapped, relationship
from db.base import Base
from sqlalchemy import Integer, String, ForeignKey


class Skills(Base):
    __tablename__ = 'skills'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(300))
    level: Mapped[int] = mapped_column(Integer)

    card_id: Mapped[int] = mapped_column(ForeignKey('cards.id'))

    card: Mapped["Card"] = relationship(
        "Card",
        back_populates="skills",
    )