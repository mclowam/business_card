from sqlalchemy import select

from models.skills import Skills


class SkillRepository:
    def __init__(self, session):
        self._session = session

    async def add(self, skill: Skills) -> Skills:
        self._session.add(skill)
        await self._session.commit()
        await self._session.refresh(skill)
        return skill

    async def get(self, skill_id: int) -> Skills | None:
        query = select(Skills).where(Skills.id == skill_id)
        result = await self._session.execute(query)
        return result.scalar_one_or_none()

    async def list(self, card_id: int) -> list[Skills]:
        query = select(Skills).where(Skills.card_id == card_id)
        result = await self._session.execute(query)
        return list(result.scalars().all())
