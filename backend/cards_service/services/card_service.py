from abstractions import (
    IUserOccupationRepository,
    ICardRepository,
    ISkillsRepository,
    IExperienceRepository,
    IProjectsRepository,
)
from models.card import Card
from models.skills import Skills
from models.experience import Experience
from models.occupation import UserOccupation
from models.projects import Project
from schemas.card import CardCreateSchema, CardReadSchema


class CardService:
    def __init__(
        self,
        card_repository: ICardRepository,
        skill_repository: ISkillsRepository,
        experience_repository: IExperienceRepository,
        occupation_repository: IUserOccupationRepository,
        project_repository: IProjectsRepository,
    ):
        self._card_repo = card_repository
        self._skill_repo = skill_repository
        self._experience_repo = experience_repository
        self._occupation_repo = occupation_repository
        self._project_repo = project_repository

    async def get_card(self, card_id: int) -> CardReadSchema | None:
        card = await self._card_repo.detail(card_id)
        if card is None:
            return None
        return CardReadSchema.model_validate(card)

    async def get_card_by_user(self, user_id: int) -> CardReadSchema | None:
        card = await self._card_repo.card_by_user(user_id)
        if card is None:
            return None
        return CardReadSchema.model_validate(card)

    async def create_card(self, user_id: int, data: CardCreateSchema) -> CardReadSchema:
        new_card = Card(
            user_id=user_id,
            first_name=data.first_name,
            last_name=data.last_name,
            profession=data.profession,
            text=data.text,
            about_user=data.about_user,
            skills=[
                Skills(name=s.name, level=s.level)
                for s in data.skills
            ],
            experiences=[
                Experience(text=e.text, description=e.description)
                for e in data.experiences
            ],
            user_occupations=[
                UserOccupation(page=o.page, description=o.description)
                for o in data.user_occupations
            ],
            projects=[
                Project(text=p.text, description=p.description)
                for p in data.projects
            ],
        )

        created = await self._card_repo.add(new_card)
        return CardReadSchema.model_validate(created)

    async def delete_card(self, card_id: int) -> bool:
        card = await self._card_repo.detail(card_id)
        if card is None:
            return False
        await self._card_repo.delete(card)
        return True
