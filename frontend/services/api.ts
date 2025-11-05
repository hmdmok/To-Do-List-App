import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  getAllTasks: () => api.get('/tasks'),
  getTask: (id: number) => api.get(`/tasks/${id}`),
  createTask: (taskData: any) => api.post('/tasks', taskData),
  updateTask: (id: number, taskData: any) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
  deleteMultipleTasks: (taskIds: number[]) => 
    api.post('/tasks/delete-multiple', { task_ids: taskIds }),
  getStats: () => api.get('/stats'),
};

export default api;