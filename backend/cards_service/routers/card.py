from fastapi import APIRouter, HTTPException, Depends

from core.security import get_current_user
from db.session import SessionDep
from repositories import (
    CardRepository,
    SkillRepository,
    ExperienceRepository,
    UserOccupationRepository,
    ProjectRepository,
)
from schemas import UserPayload
from schemas.card import CardCreateSchema, CardUpdateSchema, CardReadSchema
from services.card_service import CardService

card_router = APIRouter(prefix="/api/card", tags=["card"])


def get_service(session: SessionDep) -> CardService:
    return CardService(
        card_repository=CardRepository(session=session),
        skill_repository=SkillRepository(session=session),
        experience_repository=ExperienceRepository(session=session),
        occupation_repository=UserOccupationRepository(session=session),
        project_repository=ProjectRepository(session=session),
    )


@card_router.post("/", response_model=CardReadSchema, status_code=201)
async def create_card(
    data: CardCreateSchema,
    session: SessionDep,
    user: UserPayload = Depends(get_current_user),
):
    service = get_service(session)
    return await service.create_card(user_id=user.user_id, data=data)


@card_router.get("/{card_id}", response_model=CardReadSchema)
async def get_card(card_id: int, session: SessionDep):
    service = get_service(session)
    card = await service.get_card(card_id)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@card_router.get("/user/{user_id}", response_model=CardReadSchema)
async def get_card_by_user(session: SessionDep, user: UserPayload = Depends(get_current_user)):
    service = get_service(session)
    card = await service.get_card_by_user(user.user_id)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@card_router.patch("/{card_id}", response_model=CardReadSchema)
async def update_card(
    card_id: int,
    data: CardUpdateSchema,
    session: SessionDep,
    user: UserPayload = Depends(get_current_user),
):
    service = get_service(session)
    card = await service.update_card(card_id=card_id, user_id=user.user_id, data=data)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found or access denied")
    return card


@card_router.patch("/me", response_model=CardReadSchema)
async def update_my_card(
    data: CardUpdateSchema,
    session: SessionDep,
    user: UserPayload = Depends(get_current_user),
):
    service = get_service(session)
    card = await service.update_my_card(user_id=user.user_id, data=data)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@card_router.delete("/{card_id}", status_code=204)
async def delete_card(card_id: int, session: SessionDep):
    service = get_service(session)
    deleted = await service.delete_card(card_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Card not found")
