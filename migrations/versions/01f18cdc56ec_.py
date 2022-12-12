"""empty message

Revision ID: 01f18cdc56ec
Revises: 9e0c7da3704b
Create Date: 2022-12-12 11:29:23.674316

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '01f18cdc56ec'
down_revision = '9e0c7da3704b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('actividades', 'foto',
               existing_type=postgresql.BYTEA(),
               type_=sa.String(length=120),
               existing_nullable=True)
    op.alter_column('users', 'foto',
               existing_type=postgresql.BYTEA(),
               type_=sa.String(length=120),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'foto',
               existing_type=sa.String(length=120),
               type_=postgresql.BYTEA(),
               existing_nullable=True)
    op.alter_column('actividades', 'foto',
               existing_type=sa.String(length=120),
               type_=postgresql.BYTEA(),
               existing_nullable=True)
    # ### end Alembic commands ###
