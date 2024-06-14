import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Task = {
  id: string;
  type: 'one-time' | 'recurring';
  time: string;
  cron?: string;
  executedAt?: string;
};

type TasksState = {
  tasks: Task[];
  executedTasks: Task[];
  loading: boolean;
  error: string | null;
};

const initialState: TasksState = {
  tasks: [],
  executedTasks: [],
  loading: false,
  error: null,
};

const baseURL = 'http://localhost:5000/api';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(`${baseURL}/tasks`);
  return response.data;
});

export const fetchExecutedTasks = createAsyncThunk('tasks/fetchExecutedTasks', async () => {
  const response = await axios.get(`${baseURL}/tasks/executed`);
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask: Partial<Task>) => {
  const response = await axios.post(`${baseURL}/tasks`, newTask);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await axios.delete(`${baseURL}/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(fetchExecutedTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExecutedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.executedTasks = action.payload;
      })
      .addCase(fetchExecutedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch executed tasks';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
