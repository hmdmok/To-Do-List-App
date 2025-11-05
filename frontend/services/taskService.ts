import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at?: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  is_completed?: boolean;
}

export interface DashboardStats {
  total_tasks: number;
  completed_tasks: number;
  deleted_tasks: number;
  updated_tasks: number;
}

export const taskService = {
  getTasks: () => api.get<Task[]>('/tasks'),
  createTask: (data: TaskCreate) => api.post<Task>('/tasks', data),
  updateTask: (id: number, data: TaskUpdate) => api.put<Task>(`/tasks/${id}`, data),
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
  getDashboardStats: () => api.get<DashboardStats>('/dashboard/stats'),
};