from sqlalchemy import select

from app.models.projects import Project


class ProjectRepository:
    def __init__(self, session):
        self._session = session

    async def add(self, project: Project) -> Project:
        self._session.add(project)
        await self._session.commit()
        await self._session.refresh(project)
        return project

    async def get(self, project_id: int) -> Project | None:
        query = select(Project).where(Project.id == project_id)
        result = await self._session.execute(query)
        return result.scalar_one_or_none()

    async def list(self, card_id: int) -> list[Project]:
        query = select(Project).where(Project.card_id == card_id)
        result = await self._session.execute(query)
        return list(result.scalars().all())
