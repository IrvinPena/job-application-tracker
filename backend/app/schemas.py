from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

# ---------- USERS ----------

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

# ---------- JOBS ----------

class JobBase(BaseModel):
    company: str
    position: str
    status: str
    date_applied: date

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    status: Optional[str] = None

class JobResponse(JobBase):
    id: int

    class Config:
        from_attributes = True
