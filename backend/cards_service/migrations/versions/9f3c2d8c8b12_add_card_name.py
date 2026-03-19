"""add card name

Revision ID: 9f3c2d8c8b12
Revises: ba833392e241
Create Date: 2026-03-17

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "9f3c2d8c8b12"
down_revision: Union[str, Sequence[str], None] = "ba833392e241"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("cards", sa.Column("name", sa.String(length=100), nullable=True))

    # Backfill existing rows deterministically
    op.execute("UPDATE cards SET name = 'card-' || id WHERE name IS NULL")

    op.alter_column("cards", "name", existing_type=sa.String(length=100), nullable=False)
    op.create_unique_constraint("uq_cards_name", "cards", ["name"])


def downgrade() -> None:
    op.drop_constraint("uq_cards_name", "cards", type_="unique")
    op.drop_column("cards", "name")

