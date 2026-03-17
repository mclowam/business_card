from pydantic import BaseModel
from schemas.occupation import OccupationSchema
from schemas.experience import ExperienceSchema
from schemas.projects import ProjectSchema
from schemas.skills import SkillsSchema


class CardCreateSchema(BaseModel):
    name: str
    first_name: str
    last_name: str
    profession: str
    text: str
    about_user: str

    user_occupations: list[OccupationSchema] | None = None
    skills: list[SkillsSchema] | None = None
    experiences: list[ExperienceSchema] | None = None
    projects: list[ProjectSchema] | None = None


class CardUpdateSchema(BaseModel):
    name: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    profession: str | None = None
    text: str | None = None
    about_user: str | None = None

    user_occupations: list[OccupationSchema] | None = None
    skills: list[SkillsSchema] | None = None
    experiences: list[ExperienceSchema] | None = None
    projects: list[ProjectSchema] | None = None


class CardReadSchema(BaseModel):
    id: int
    user_id: int
    name: str
    first_name: str
    last_name: str
    profession: str
    text: str
    about_user: str

    user_occupations: list[OccupationSchema] = []
    skills: list[SkillsSchema] = []
    experiences: list[ExperienceSchema] = []
    projects: list[ProjectSchema] = []

    class Config:
        from_attributes = True
