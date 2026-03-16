from pydantic import BaseModel


class ExperienceSchema(BaseModel):
    text: str
    description: str

    class Config:
        from_attributes = True
