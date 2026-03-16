from sqlalchemy import select

from models.experience import Experience


class ExperienceRepository:
    def __init__(self, session):
        self._session = session

    async def add(self, experience: Experience) -> Experience:
        self._session.add(experience)
        await self._session.commit()
        await self._session.refresh(experience)
        return experience

    async def get(self, experience_id: int) -> Experience | None:
        query = select(Experience).where(Experience.id == experience_id)
        result = await self._session.execute(query)
        return result.scalar_one_or_none()

    async def list(self, card_id: int) -> list[Experience]:
        query = select(Experience).where(Experience.card_id == card_id)
        result = await self._session.execute(query)
        return list(result.scalars().all())
