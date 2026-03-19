from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core.minio_client import ensure_bucket
from app.routers.card import card_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ensure_bucket()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(card_router)


@app.get("/")
async def root():
    return {"detail": "all ready!"}
