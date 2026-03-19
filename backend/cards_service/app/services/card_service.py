from app.abstractions import (
    IUserOccupationRepository,
    ICardRepository,
    ISkillsRepository,
    IExperienceRepository,
    IProjectsRepository,
)
from app.models.card import Card
from app.models.skills import Skills
from app.models.experience import Experience
from app.models.occupation import UserOccupation
from app.models.projects import Project
from app.schemas.card import CardCreateSchema, CardUpdateSchema, CardReadSchema

from app.abstractions.minor_abstractions import IMinioImageStorage


class CardService:
    def __init__(
        self,
        card_repository: ICardRepository,
        skill_repository: ISkillsRepository,
        experience_repository: IExperienceRepository,
        occupation_repository: IUserOccupationRepository,
        project_repository: IProjectsRepository,
        image_storage: IMinioImageStorage,
    ):
        self._card_repo = card_repository
        self._skill_repo = skill_repository
        self._experience_repo = experience_repository
        self._occupation_repo = occupation_repository
        self._project_repo = project_repository
        self._images = image_storage

    @staticmethod
    def _avatar_url(card: Card) -> str | None:
        if card.avatar_key is None:
            return None
        return f"/api/card/{card.id}/avatar"

    def _to_schema(self, card: Card) -> CardReadSchema:
        schema = CardReadSchema.model_validate(card)
        schema.avatar_url = self._avatar_url(card)
        return schema

    async def get_card(self, card_id: int) -> CardReadSchema | None:
        card = await self._card_repo.detail(card_id)
        if card is None:
            return None
        return self._to_schema(card)

    async def get_card_by_user(self, user_id: int) -> CardReadSchema | None:
        card = await self._card_repo.card_by_user(user_id)
        if card is None:
            return None
        return self._to_schema(card)

    async def get_card_by_name(self, name: str) -> CardReadSchema | None:
        card = await self._card_repo.card_by_name(name)
        if card is None:
            return None
        return self._to_schema(card)

    async def create_card(self, user_id: int, data: CardCreateSchema) -> CardReadSchema:
        skills = data.skills or []
        experiences = data.experiences or []
        occupations = data.user_occupations or []
        projects = data.projects or []

        new_card = Card(
            name=data.name,
            user_id=user_id,
            first_name=data.first_name,
            last_name=data.last_name,
            profession=data.profession,
            text=data.text,
            about_user=data.about_user,
            skills=[
                Skills(name=s.name, level=s.level)
                for s in skills
            ],
            experiences=[
                Experience(text=e.text, description=e.description)
                for e in experiences
            ],
            user_occupations=[
                UserOccupation(page=o.page, description=o.description)
                for o in occupations
            ],
            projects=[
                Project(text=p.text, description=p.description)
                for p in projects
            ],
        )

        created = await self._card_repo.add(new_card)
        loaded = await self._card_repo.detail(created.id)
        return self._to_schema(loaded)

    async def upload_avatar(self, user_id: int, file_obj, content_type: str) -> CardReadSchema | None:
        card = await self._card_repo.card_by_user(user_id)
        if card is None:
            return None

        key = f"user_{user_id}_avatar"
        await self._images.upload(file_obj, key, content_type=content_type)
        card.avatar_key = key

        await self._card_repo.save(card)
        loaded = await self._card_repo.detail(card.id)
        return self._to_schema(loaded)

    async def delete_avatar(self, user_id: int) -> bool:
        card = await self._card_repo.card_by_user(user_id)
        if card is None:
            return False
        if card.avatar_key:
            await self._images.delete(card.avatar_key)
            card.avatar_key = None
            await self._card_repo.save(card)
        return True

    async def get_avatar_bytes(self, card_id: int) -> tuple[bytes, str] | None:
        card = await self._card_repo.detail(card_id)
        if card is None or card.avatar_key is None:
            return None
        return await self._images.get_bytes(card.avatar_key)

    async def update_card(self, card_id: int, user_id: int, data: CardUpdateSchema) -> CardReadSchema | None:
        card = await self._card_repo.detail(card_id)
        if card is None or card.user_id != user_id:
            return None

        self._apply_update(card, data)

        await self._card_repo.save(card)
        loaded = await self._card_repo.detail(card.id)
        return self._to_schema(loaded)

    async def update_my_card(self, user_id: int, data: CardUpdateSchema) -> CardReadSchema | None:
        card = await self._card_repo.card_by_user(user_id)
        if card is None:
            return None

        self._apply_update(card, data)

        await self._card_repo.save(card)
        loaded = await self._card_repo.detail(card.id)
        return self._to_schema(loaded)

    def _apply_update(self, card: Card, data: CardUpdateSchema) -> None:
        if data.name is not None:
            card.name = data.name
        if data.first_name is not None:
            card.first_name = data.first_name
        if data.last_name is not None:
            card.last_name = data.last_name
        if data.profession is not None:
            card.profession = data.profession
        if data.text is not None:
            card.text = data.text
        if data.about_user is not None:
            card.about_user = data.about_user

        if data.skills is not None:
            card.skills.clear()
            card.skills = [Skills(name=s.name, level=s.level) for s in data.skills]

        if data.experiences is not None:
            card.experiences.clear()
            card.experiences = [
                Experience(text=e.text, description=e.description) for e in data.experiences
            ]

        if data.user_occupations is not None:
            card.user_occupations.clear()
            card.user_occupations = [
                UserOccupation(page=o.page, description=o.description) for o in data.user_occupations
            ]

        if data.projects is not None:
            card.projects.clear()
            card.projects = [Project(text=p.text, description=p.description) for p in data.projects]

    async def delete_card(self, card_id: int) -> bool:
        card = await self._card_repo.detail(card_id)
        if card is None:
            return False
        if card.avatar_key:
            await self._images.delete(card.avatar_key)
        await self._card_repo.delete(card)
        return True

    async def delete_my_card(self, user_id: int) -> bool:
        card = await self._card_repo.card_by_user(user_id)
        if card is None:
            return False
        if card.avatar_key:
            await self._images.delete(card.avatar_key)
        await self._card_repo.delete(card)
        return True
