import tasks from './tasks.json' // Import the tasks from your JSON file

/**
 * Return the task name that is currently active based on the current time and day.
 *
 * This function takes into account the day of the week and the time of day
 * to determine the currently active task. If no task is found, it returns a
 * fallback value of 'Select Task'.
 *
 * @returns {string} The name of the currently active task.
 */
export const getCurrentTask = (): string => {
  const now = new Date()
  const currentDay = now.getDay() // 0 is Sunday, 6 is Saturday

  const dayType = currentDay === 0 || currentDay === 6 ? 'weekends' : 'weekDays' // Check if it's weekend
  const prevDayType = currentDay === 0 || currentDay === 6 ? 'weekends' : 'weekDays' // To handle the previous day for tasks spanning midnight

  // Function to check if the current time falls within a task's time range
  const isTimeInRange = (startTime: Date, endTime: Date) => {
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1) // Handle cases where the task spans midnight
    }
    return now >= startTime && now <= endTime
  }

  // Iterate over the tasks to check if the current time fits any time ranges
  for (const task of tasks) {
    // First check the current day's tasks
    const timeRanges = task.timeRanges[dayType] || task.timeRanges['allWeek']
    if (timeRanges) {
      for (const range of timeRanges) {
        const [startHour, startMinute] = range.start.split(':').map(Number)
        const [endHour, endMinute] = range.end.split(':').map(Number)

        const startTime = new Date(now)
        startTime.setHours(startHour, startMinute, 0, 0)

        const endTime = new Date(now)
        endTime.setHours(endHour, endMinute, 0, 0)

        if (isTimeInRange(startTime, endTime)) {
          return task.taskName
        }
      }
    }

    // If no match, check the previous day's tasks for tasks that span midnight
    const prevDayTimeRanges = task.timeRanges[prevDayType]
    if (prevDayTimeRanges) {
      for (const range of prevDayTimeRanges) {
        const [startHour, startMinute] = range.start.split(':').map(Number)
        const [endHour, endMinute] = range.end.split(':').map(Number)

        const startTime = new Date(now)
        startTime.setDate(startTime.getDate() - 1) // Set to the previous day
        startTime.setHours(startHour, startMinute, 0, 0)

        const endTime = new Date(now)
        endTime.setHours(endHour, endMinute, 0, 0)

        if (isTimeInRange(startTime, endTime)) {
          return task.taskName
        }
      }
    }
  }

  return 'Select Task' // Fallback if no task is matched
}
