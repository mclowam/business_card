from pydantic import BaseModel


class ProjectSchema(BaseModel):
    text: str
    description: str

    class Config:
        from_attributes = True
