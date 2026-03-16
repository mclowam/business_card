from fastapi import FastAPI
from routers.card import card_router

app = FastAPI(title="CardCraft API")

app.include_router(card_router)


@app.get("/")
async def root():
    return {"detail": "all ready!"}
