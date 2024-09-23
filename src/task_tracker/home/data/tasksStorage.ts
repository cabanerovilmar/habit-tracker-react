import { TaskPayload } from '../HomeViewModel'

const TASKS_STORAGE_KEY = 'completedTasks'

export const saveTasksToLocalStorage = (taskPayload: TaskPayload) => {
  const existingTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || '[]')

  const updatedTasks = [...existingTasks, taskPayload]

  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks))
}

export const getSavedTasksFromLocalStorage = (): TaskPayload[] => {
  return JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || '[]')
}
