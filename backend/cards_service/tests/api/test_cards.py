from unittest.mock import AsyncMock

import pytest
from httpx import AsyncClient

from tests.helpers import make_result_one


# @pytest.mark.asyncio
# async def test_get_cards_empty(client, mock_session):
#     # Настраиваем мок на конкретный сценарий, если нужно
#     # mock_session.execute.return_value = make_result_all([твой_объект])
#
#     response = await client.get("/cards/")
#
#     assert response.status_code == 200
#     assert response.json() == []
#     mock_session.execute.assert_called_once()
#
@pytest.mark.asyncio
async def test_get_card_not_found(client: AsyncClient, mock_session):
    mock_session.execute = AsyncMock(return_value=make_result_one(None))

    response = await client.get("/api/card/999")

    assert response.status_code == 404