from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class IntakeCreate(BaseModel):
    plate_number: str = Field(..., min_length=1, max_length=32)
    vehicle_model: str = Field(..., min_length=1, max_length=64)


class IntakePatch(BaseModel):
    status: Literal["done"]


class IntakeOut(BaseModel):
    id: str
    plate_number: str
    vehicle_model: str
    status: Literal["waiting", "done"]
    registered_at: datetime
    completed_at: datetime | None = None

    model_config = {"from_attributes": True}
