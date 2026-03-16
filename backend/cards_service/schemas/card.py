from pydantic import BaseModel
from schemas.occupation import OccupationSchema
from schemas.experience import ExperienceSchema
from schemas.projects import ProjectSchema
from schemas.skills import SkillsSchema


class CardCreateSchema(BaseModel):
    first_name: str
    last_name: str
    profession: str
    text: str
    about_user: str

    user_occupations: list[OccupationSchema]
    skills: list[SkillsSchema]
    experiences: list[ExperienceSchema]
    projects: list[ProjectSchema]


class CardReadSchema(BaseModel):
    id: int
    user_id: int
    first_name: str
    last_name: str
    profession: str
    text: str
    about_user: str

    user_occupations: list[OccupationSchema]
    skills: list[SkillsSchema]
    experiences: list[ExperienceSchema]
    projects: list[ProjectSchema]

    class Config:
        from_attributes = True
