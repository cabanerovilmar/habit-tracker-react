// tasksStorage.ts

import { TaskPayload } from './HomeViewModel'

// Key for localStorage
const TASKS_STORAGE_KEY = 'completedTasks'

// Save a task payload to localStorage
export const saveTasksToLocalStorage = (taskPayload: TaskPayload) => {
  // Retrieve current tasks from localStorage
  const existingTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || '[]')

  // Add the new task to the existing tasks
  const updatedTasks = [...existingTasks, taskPayload]

  // Save back to localStorage
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks))
}

// Retrieve all completed tasks from localStorage
export const getSavedTasksFromLocalStorage = (): TaskPayload[] => {
  return JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || '[]')
}
