import pytest
from unittest.mock import MagicMock, AsyncMock
from httpx import AsyncClient, ASGITransport

from app.main import app
from app.core.security import get_current_user
from app.db.session import get_session
from app.schemas import UserPayload
from tests.helpers import make_result_all

@pytest.fixture
def user():
    return UserPayload(user_id=1, role="client", email="test@gmail.com")

@pytest.fixture
def mock_session():
    session = MagicMock()
    session.execute = AsyncMock(return_value=make_result_all([]))
    session.add = MagicMock()
    session.commit = AsyncMock(return_value=None)
    session.flush = AsyncMock(return_value=None)
    session.close = AsyncMock(return_value=None)
    return session

@pytest.fixture(autouse=True)
def override_dependencies(user, mock_session):
    async def _mock_get_user():
        return user
    async def _mock_get_session():
        yield mock_session

    app.dependency_overrides[get_current_user] = _mock_get_user
    app.dependency_overrides[get_session] = _mock_get_session
    yield
    app.dependency_overrides.clear()

@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:
        yield ac