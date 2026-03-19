from pydantic import BaseModel


class OccupationSchema(BaseModel):
    page: str
    description: str

    class Config:
        from_attributes = True
