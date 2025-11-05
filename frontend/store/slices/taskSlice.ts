import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskCreate, TaskUpdate } from '../../types/task';
import { taskService } from '../../services/taskService';

interface TaskState {
  tasks: Task[];
  selectedTasks: number[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTasks: [],
  loading: false,
  error: null
};

// Async Thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await taskService.getTasks();
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: TaskCreate) => {
    const response = await taskService.createTask(taskData);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }: { id: number; taskData: TaskUpdate }) => {
    const response = await taskService.updateTask(id, taskData);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number) => {
    await taskService.deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTaskSelection: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      if (state.selectedTasks.includes(taskId)) {
        state.selectedTasks = state.selectedTasks.filter(id => id !== taskId);
      } else {
        state.selectedTasks.push(taskId);
      }
    },
    clearSelectedTasks: (state) => {
      state.selectedTasks = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task: { id: number; }) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task: { id: number; })=> task.id !== action.payload);
        state.selectedTasks = state.selectedTasks.filter(id => id !== action.payload);
      });
  }
});

export const { toggleTaskSelection, clearSelectedTasks } = taskSlice.actions;
export default taskSlice.reducer;