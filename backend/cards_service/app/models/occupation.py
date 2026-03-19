from app.db.base import Base
from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship


class UserOccupation(Base):
    __tablename__ = 'user_occupations'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    page: Mapped[str] = mapped_column(String(500))
    description: Mapped[str] = mapped_column(String(2000))

    card_id: Mapped[int] = mapped_column(ForeignKey('cards.id'))

    card: Mapped["Card"] = relationship(
        "Card",
        back_populates="user_occupations"
    )