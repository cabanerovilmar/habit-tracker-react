export type TimeRange = {
  start: string
  end: string
}

export type TaskSchedule = {
  weekDays?: TimeRange[]
  weekends?: TimeRange[]
  allWeek?: TimeRange[]
}

export type Task = {
  taskName: string
  timeRanges: TaskSchedule
}

/**
 * Parse a time string in HH:mm format into minutes past midnight.
 *
 * @param {string} time The time string in HH:mm format
 * @returns {number} The time in minutes past midnight
 */
export const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Check if the given time is within the given time range.
 *
 * This function takes into account tasks that span past midnight.
 *
 * @param {number} currentTime The current time in minutes past midnight
 * @param {string} start The start time in HH:mm format
 * @param {string} end The end time in HH:mm format
 * @returns {boolean} true if the current time is within the given time range
 */
export const isTimeInRange = (currentTime: number, start: string, end: string): boolean => {
  const startMinutes = parseTime(start)
  const endMinutes = parseTime(end)

  if (endMinutes < startMinutes) {
    // Handle tasks that span past midnight
    return currentTime >= startMinutes || currentTime < endMinutes
  }

  return currentTime >= startMinutes && currentTime < endMinutes
}

/**
 * Return the task name that is currently active based on the current time and day.
 *
 * This function takes into account the day of the week and the time of day
 * to determine the currently active task. If no task is found, it returns a
 * fallback value of 'Select Task'.
 *
 * @param {Task[]} tasks The list of tasks to check
 * @returns {string} The name of the currently active task
 */
export const getCurrentTask = (tasks: Task[]): string => {
  const now = new Date()
  const currentDay = now.getDay() // 0 is Sunday, 6 is Saturday
  const currentMinutes = parseTime(now.toTimeString().slice(0, 5))

  const dayType = currentDay === 0 || currentDay === 6 ? 'weekends' : 'weekDays'

  for (const task of tasks) {
    const timeRanges = [...(task.timeRanges[dayType] || []), ...(task.timeRanges['allWeek'] || [])]

    for (const range of timeRanges) {
      if (isTimeInRange(currentMinutes, range.start, range.end)) {
        return task.taskName
      }
    }
  }

  return 'Select Task'
}
