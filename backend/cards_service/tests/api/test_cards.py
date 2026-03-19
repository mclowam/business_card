from unittest.mock import AsyncMock

import pytest
from httpx import AsyncClient

from app.models import Card
from tests.helpers import make_result_one


@pytest.mark.asyncio
async def test_create_card_success(client: AsyncClient, mock_session):
    card_data = {
        "name": "test Card",
        "first_name": "test Ivan",
        "last_name": "test Ivanov",
        "profession": "Backend Developer",
        "text": "Open for opportunities",
        "about_user": "Experienced Python",
        "user_id": 1
    }

    mock_card = Card(id=1, **card_data)

    mock_session.execute.return_value = make_result_one(mock_card)

    response = await client.post('/api/card/', json=card_data)

    assert response.status_code == 201
    assert response.json()["name"] == card_data["name"]


@pytest.mark.asyncio
async def test_get_card_success(client: AsyncClient, mock_session):
    card_id = 1
    existing_card = Card(
        id=card_id,
        name="Business Card",
        first_name="John",
        last_name="Doe",
        profession="Designer",
        text="Hello world",
        about_user="I am a designer",
        user_id=10,
        skills=[],
        experiences=[],
        projects=[],
        user_occupations=[]

    )

    mock_session.execute.return_value = make_result_one(existing_card)

    response = await client.get(f"/api/card/{card_id}")

    assert response.status_code == 200
    data = response.json()

    assert data['name'] == "Business Card"

    mock_session.execute.assert_called_once()


@pytest.mark.asyncio
async def test_get_card_not_found(client: AsyncClient, mock_session):
    mock_session.execute = AsyncMock(return_value=make_result_one(None))

    response = await client.get("/api/card/999")

    assert response.status_code == 404