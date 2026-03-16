from pydantic import BaseModel


class SkillsSchema(BaseModel):
    name: str
    level: int

    class Config:
        from_attributes = True
