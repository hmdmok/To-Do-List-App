from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    is_completed: Optional[bool] = None
    is_updated: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    is_completed: bool
    is_deleted: bool
    is_updated: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True