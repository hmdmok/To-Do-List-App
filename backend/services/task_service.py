from sqlalchemy.orm import Session
from models.task_models import Task
from schemas.task_schemas import TaskCreate, TaskUpdate

class TaskService:
    @staticmethod
    def get_tasks(db: Session, skip: int = 0, limit: int = 100):
        """جلب جميع المهام غير المحذوفة"""
        print("test")
        return db.query(Task).filter(Task.is_deleted == False).offset(skip).limit(limit).all()
    
    @staticmethod
    def create_task(db: Session, task: TaskCreate):
        """إنشاء مهمة جديدة"""
        db_task = Task(
            title=task.title,
            description=task.description
        )
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    
    @staticmethod
    def update_task(db: Session, task_id: int, task_update: TaskUpdate):
        """تحديث المهمة"""
        db_task = db.query(Task).filter(Task.id == task_id).first()
        if db_task:
            for key, value in task_update.dict(exclude_unset=True).items():
                setattr(db_task, key, value)
                db_task.is_updated = True
            db.commit()
            db.refresh(db_task)
        return db_task
    
    @staticmethod
    def delete_task(db: Session, task_id: int):
        """حذف منطقي للمهمة"""
        db_task = db.query(Task).filter(Task.id == task_id).first()
        if db_task:
            db_task.is_deleted = True
            db.commit()
            db.refresh(db_task)
        return db_task
    
    @staticmethod
    def get_dashboard_stats(db: Session):
        """جلب إحصائيات لوحة التحكم"""
        total_tasks = db.query(Task).filter(Task.is_deleted == False).count()
        completed_tasks = db.query(Task).filter(
            Task.is_deleted == False, 
            Task.is_completed == True
        ).count()
        deleted_tasks = db.query(Task).filter(Task.is_deleted == True).count()
        updated_tasks = db.query(Task).filter(Task.is_updated == True).count()
        
        return {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "deleted_tasks": deleted_tasks,
            "updated_tasks": updated_tasks
        }