from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import task_routes
from db.database import engine, Base

# إنشاء الجداول
Base.metadata.create_all(bind=engine)

app1 = FastAPI(
    title="Todo List API",
    description="API لإدارة قائمة المهام",
    version="1.0.0"
)

# إعداد CORS للسماح بالاتصال من الواجهة الأمامية
app1.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # عنوان Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# تضمين المسارات
app1.include_router(task_routes.router, prefix="/api/v1")

@app1.get("/")
async def read_root():
    print("get req")
    return ({"message": "Welcome to Todo List API"})

# @app1.get("/w")
