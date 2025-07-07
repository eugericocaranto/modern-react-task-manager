import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
}

const saveTasksToLocalStorage = (tasks) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromLocalStorage(),
    filter: {
      status: 'all',
      search: ''
    }
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setStatus: (state, action) => {
      state.filter.status = action.payload;
    },
    setSearch: (state, action) => {
      state.filter.search = action.payload;
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state.tasks);
      }
    }
  }
});

export const {
  addTask,
  deleteTask,
  updateTask,
  setStatus,
  setSearch,
  toggleComplete
} = taskSlice.actions;

export default taskSlice.reducer;