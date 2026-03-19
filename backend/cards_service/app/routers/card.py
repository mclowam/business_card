from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.responses import Response

from app.core.security import get_current_user
from app.db.session import SessionDep
from app.repositories import (
    CardRepository,
    SkillRepository,
    ExperienceRepository,
    UserOccupationRepository,
    ProjectRepository,
)
from app.schemas import UserPayload
from app.schemas.card import CardCreateSchema, CardUpdateSchema, CardReadSchema
from app.services.card_service import CardService
from app.services.image_storage import MinioImageStorage

card_router = APIRouter(prefix="/api/card", tags=["card"])

_ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
_MAX_AVATAR_SIZE = 5 * 1024 * 1024


def get_service(session: SessionDep) -> CardService:
    return CardService(
        card_repository=CardRepository(session=session),
        skill_repository=SkillRepository(session=session),
        experience_repository=ExperienceRepository(session=session),
        occupation_repository=UserOccupationRepository(session=session),
        project_repository=ProjectRepository(session=session),
        image_storage=MinioImageStorage(),
    )


@card_router.post("/", response_model=CardReadSchema, status_code=201)
async def create_card(
    data: CardCreateSchema,
    session: SessionDep,
    user: UserPayload = Depends(get_current_user),
):
    service = get_service(session)
    return await service.create_card(user_id=user.user_id, data=data)



@card_router.post("/me/avatar", response_model=CardReadSchema)
async def upload_my_avatar(
    session: SessionDep,
    avatar: UploadFile = File(...),
    user: UserPayload = Depends(get_current_user),
):
    if avatar.content_type not in _ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported image type '{avatar.content_type}'. Allowed: jpeg, png, webp, gif.",
        )

    data = await avatar.read()
    if len(data) > _MAX_AVATAR_SIZE:
        raise HTTPException(status_code=413, detail="Avatar file exceeds 5 MB limit.")

    import io
    service = get_service(session)
    card = await service.upload_avatar(
        user_id=user.user_id,
        file_obj=io.BytesIO(data),
        content_type=avatar.content_type,
    )
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@card_router.delete("/me/avatar", status_code=204)
async def delete_my_avatar(
    session: SessionDep,
    user: UserPayload = Depends(get_current_user),
):
    service = get_service(session)
    deleted = await service.delete_avatar(user_id=user.user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Card not found")



@card_router.get("/me", response_model=CardReadSchema)
async def get_my_card(session: SessionDep, user: UserPayload = Depends(get_current_user)):
    service = get_service(session)
    card = await service.get_card_by_user(user.user_id)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
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


@card_router.delete("/me", status_code=204)
async def delete_my_card(session: SessionDep, user: UserPayload = Depends(get_current_user)):
    service = get_service(session)
    deleted = await service.delete_my_card(user_id=user.user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Card not found")


@card_router.get("/site/{name}", response_model=CardReadSchema)
async def get_card_by_site_name(name: str, session: SessionDep):
    service = get_service(session)
    card = await service.get_card_by_name(name)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@card_router.get("/user/me", response_model=CardReadSchema)
async def get_card_by_user(session: SessionDep, user: UserPayload = Depends(get_current_user)):
    service = get_service(session)
    card = await service.get_card_by_user(user.user_id)
    if card is None:
        raise HTTPException(status_code=404, detail="Card not found")
    return card


@card_router.get("/{card_id}/avatar")
async def get_card_avatar(card_id: int, session: SessionDep):
    service = get_service(session)
    result = await service.get_avatar_bytes(card_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Avatar not found")
    data, content_type = result
    return Response(content=data, media_type=content_type)


@card_router.get("/{card_id}", response_model=CardReadSchema)
async def get_card(card_id: int, session: SessionDep):
    service = get_service(session)
    card = await service.get_card(card_id)
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


@card_router.delete("/{card_id}", status_code=204)
async def delete_card(card_id: int, session: SessionDep):
    service = get_service(session)
    deleted = await service.delete_card(card_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Card not found")
