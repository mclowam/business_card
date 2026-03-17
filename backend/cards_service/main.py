from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routers.card import card_router

app = FastAPI()

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
