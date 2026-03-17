from sqlalchemy import select
from sqlalchemy.orm import selectinload

from db.session import SessionDep
from models.card import Card


class CardRepository:
    def __init__(self, session: SessionDep):
        self._session = session

    async def add(self, card: Card) -> Card:
        self._session.add(card)
        await self._session.commit()
        await self._session.refresh(card)
        return card

    async def detail(self, card_id: int) -> Card | None:
        query = (
            select(Card)
            .options(
                selectinload(Card.skills),
                selectinload(Card.experiences),
                selectinload(Card.projects),
                selectinload(Card.user_occupations),
            )
            .where(Card.id == card_id)
        )
        result = await self._session.execute(query)
        return result.scalar_one_or_none()

    async def card_by_user(self, user_id: int) -> Card | None:
        query = (
            select(Card)
            .options(
                selectinload(Card.skills),
                selectinload(Card.experiences),
                selectinload(Card.projects),
                selectinload(Card.user_occupations),
            )
            .where(Card.user_id == user_id)
        )
        result = await self._session.execute(query)
        return result.scalar_one_or_none()

    async def card_by_name(self, name: str) -> Card | None:
        query = (
            select(Card)
            .options(
                selectinload(Card.skills),
                selectinload(Card.experiences),
                selectinload(Card.projects),
                selectinload(Card.user_occupations),
            )
            .where(Card.name == name)
        )
        result = await self._session.execute(query)
        return result.scalar_one_or_none()

    async def save(self, card: Card) -> Card:
        await self._session.commit()
        await self._session.refresh(card)
        return card

    async def delete(self, card: Card) -> None:
        await self._session.delete(card)
        await self._session.commit()
