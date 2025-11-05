from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from schemas.task_schemas import TaskCreate, TaskUpdate, TaskResponse
from services.task_service import TaskService

router = APIRouter()

@router.get("/tasks", response_model=List[TaskResponse])
async def get_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    جلب جميع المهام
    - **skip**: عدد العناصر التي سيتم تخطيها
    - **limit**: أقصى عدد للعناصر المرتجعة
    """
    all_tasks = TaskService.get_tasks(db, skip=skip, limit=limit)
    print("skip")
    return TaskService.get_tasks(db, skip=skip, limit=limit)

@router.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """إنشاء مهمة جديدة"""
    return TaskService.create_task(db, task)

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    """تحديث مهمة موجودة"""
    db_task = TaskService.update_task(db, task_id, task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """حذف مهمة"""
    db_task = TaskService.delete_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

@router.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    """جلب إحصائيات لوحة التحكم"""
    return TaskService.get_dashboard_stats(db)