import { useState, useEffect } from 'react'
import { getCurrentTask } from '../domain/getCurrentTask'
import tasks from '../data/tasks.json'

/**
 * Returns the current task based on the time of day and day of week.
 *
 * This hook takes two boolean props: `isTaskOngoing` and `taskChange`.
 * If `isTaskOngoing` is false, the hook will use `setInterval` to update
 * the current task every second. If `taskChange` is true, the hook will
 * update the current task immediately.
 *
 * @param {boolean} isTaskOngoing Whether a task is currently ongoing.
 * @param {boolean} taskChange Whether a task change has occurred.
 * @returns {string} The current task.
 */
export const useCurrentTask = (isTaskOngoing: boolean, taskChange: boolean): string => {
  const [currentTask, setCurrentTask] = useState(getCurrentTask(tasks))

  useEffect(() => {
    if (!isTaskOngoing) {
      const intervalId = setInterval(() => {
        const newTask = getCurrentTask(tasks)
        setCurrentTask(newTask)
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [isTaskOngoing])

  useEffect(() => {
    if (taskChange) {
      const newTask = getCurrentTask(tasks)
      setCurrentTask(newTask)
    }
  }, [taskChange])

  return currentTask
}
