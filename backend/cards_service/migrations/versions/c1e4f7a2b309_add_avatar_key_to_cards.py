"""add avatar_key to cards

Revision ID: c1e4f7a2b309
Revises: 9f3c2d8c8b12
Create Date: 2026-03-19

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c1e4f7a2b309"
down_revision: Union[str, Sequence[str], None] = "9f3c2d8c8b12"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "cards",
        sa.Column("avatar_key", sa.String(length=500), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("cards", "avatar_key")
