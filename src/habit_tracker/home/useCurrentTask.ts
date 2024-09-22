import { useState, useEffect } from 'react'
import { getCurrentTask } from './getCurrentTask'

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
export const useCurrentTask = (isTaskOngoing: boolean, taskChange: boolean) => {
  const [currentTask, setCurrentTask] = useState(getCurrentTask())

  // Only update currentTask if the task is not ongoing
  useEffect(() => {
    if (!isTaskOngoing) {
      const intervalId = setInterval(() => {
        const newTask = getCurrentTask()
        setCurrentTask(newTask)
      }, 1000) // Update the current task every second when the task is not ongoing

      return () => clearInterval(intervalId)
    }
  }, [isTaskOngoing])

  useEffect(() => {
    if (taskChange) {
      const newTask = getCurrentTask()
      setCurrentTask(newTask)
    }
  }, [taskChange])

  return currentTask
}
