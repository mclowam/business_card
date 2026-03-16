from sqlalchemy import select

from models.occupation import UserOccupation


class UserOccupationRepository:
    def __init__(self, session):
        self._session = session

    async def add(self, occupation: UserOccupation) -> UserOccupation:
        self._session.add(occupation)
        await self._session.commit()
        await self._session.refresh(occupation)
        return occupation

    async def get(self, occupation_id: int) -> UserOccupation | None:
        query = select(UserOccupation).where(UserOccupation.id == occupation_id)
        result = await self._session.execute(query)
        return result.scalar_one_or_none()

    async def list(self, card_id: int) -> list[UserOccupation]:
        query = select(UserOccupation).where(UserOccupation.card_id == card_id)
        result = await self._session.execute(query)
        return list(result.scalars().all())
