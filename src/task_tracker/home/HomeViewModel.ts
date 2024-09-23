import { useState, useEffect, useRef } from 'react'
import { format, differenceInSeconds, addSeconds } from 'date-fns'
import tasks from './data/tasks.json' // Import tasks from JSON
import { useCurrentTask } from './hooks/useCurrentTask' // Assuming you have useCurrentTask logic
import { saveTasksToLocalStorage } from './data/tasksStorage'

export interface TaskPayload {
  taskName: string
  startTime: string
  endTime: string
  duration: string
  createdAt: string
  metadata: {
    userId: number
    taskCategory: string
  }
}

export interface IHomeViewModel {
  isTaskOngoing: boolean
  handleEndTask: () => void
  handleStartTask: () => void
  currentTask: string
  selectedTask: string
  showTaskPicker: boolean
  taskNames: { value: string; label: string }[]
  handleTaskSelection: (value: string | null) => void
  toggleTaskPicker: () => void
  currentDate: string
  currentTime: string
  startTime: string
  taskTimer: string | null
}

export function HomeViewModel(): IHomeViewModel {
  const [isTaskOngoing, setIsTaskOngoing] = useState<boolean>(false)
  const [taskChange, setTaskChange] = useState(false)
  const currentTask = useCurrentTask(isTaskOngoing, taskChange) // Updated task if not started yet
  const [capturedTask, setCapturedTask] = useState<string>('') // Captured task when Start is clicked
  const [currentDate, setCurrentDate] = useState<string>('') // Formatted current date
  const [currentTime, setCurrentTime] = useState<string>('') // Current time in hh:mm:ss format
  const [startTime, setStartTime] = useState<Date | null>(null) // Task start time
  const [taskTimer, setTaskTimer] = useState<string | null>(null) // Task timer in hh:mm:ss format
  const [showTaskPicker, setShowTaskPicker] = useState(false) // Task picker visibility
  const [selectedTask, setSelectedTask] = useState<string>(useCurrentTask(false, taskChange)) // Task selected by the user
  const taskIntervalRef = useRef<NodeJS.Timeout | null>(null) // useRef will persist through renders

  // Get task names from tasks.json
  const taskNames = tasks.map(task => ({ value: task.taskName, label: task.taskName }))

  // Save ongoing task data to localStorage
  const saveTaskToLocalStorage = (taskName: string, startTime: Date, taskChange: boolean) => {
    localStorage.setItem(
      'ongoingTask',
      JSON.stringify({
        taskName,
        startTime: startTime.toISOString(),
        taskChange,
      }),
    )
  }

  // Restore ongoing task from localStorage on app reload
  const restoreTaskFromLocalStorage = () => {
    const savedTask = localStorage.getItem('ongoingTask')
    if (savedTask) {
      const { taskName, startTime, taskChange } = JSON.parse(savedTask)
      const restoredStartTime = new Date(startTime)
      setCapturedTask(taskName)
      setSelectedTask(taskName)
      setTaskChange(taskChange)
      setStartTime(restoredStartTime)
      setIsTaskOngoing(true)

      // Calculate initial taskTimer value based on elapsed time
      const now = new Date()
      const secondsElapsed = differenceInSeconds(now, restoredStartTime)
      const initialTimer = format(addSeconds(new Date(0, 0), secondsElapsed), 'HH:mm:ss')
      setTaskTimer(initialTimer) // Set the initial timer to the correct elapsed time
    } else {
      setTaskTimer('00:00:00') // Default to 00:00:00 if no ongoing task
    }
  }

  // Clear task data from localStorage when task ends
  const clearTaskFromLocalStorage = () => {
    localStorage.removeItem('ongoingTask')
  }

  // On component mount, restore any ongoing task from localStorage
  useEffect(() => {
    restoreTaskFromLocalStorage()
  }, [])

  // Handle when the user selects a new task
  const handleTaskSelection = (value: string | null) => {
    if (value) {
      setSelectedTask(value) // Update the selected task
    }
    setShowTaskPicker(false) // Hide the Select dropdown
  }

  // Toggle the task picker visibility
  const toggleTaskPicker = () => setShowTaskPicker(prev => !prev)

  // Update the current date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDate(format(now, 'EEEE, MMM d')) // Format as "Saturday, Sep 21"
      setCurrentTime(format(now, 'HH:mm')) // Format time as "HH:mm:ss"
    }

    updateDateTime() // Initial set
    const intervalId = setInterval(updateDateTime, 1000) // Update every second

    return () => clearInterval(intervalId)
  }, [])

  // Effect to handle task timer logic
  useEffect(() => {
    if (isTaskOngoing && startTime) {
      // Set the interval and store the ID in the ref
      taskIntervalRef.current = setInterval(() => {
        const now = new Date()
        const secondsElapsed = differenceInSeconds(now, startTime) // Calculate the difference in seconds

        // Calculate hours, minutes, and seconds
        const hours = Math.floor(secondsElapsed / 3600)
        const minutes = Math.floor((secondsElapsed % 3600) / 60)
        const seconds = secondsElapsed % 60

        // Format time as hh:mm:ss
        setTaskTimer(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        )
      }, 1000) // Update every second
    } else {
      // If task is not ongoing, clear interval and reset the task timer
      if (taskIntervalRef.current) {
        clearInterval(taskIntervalRef.current)
      }
    }

    // Clear the interval when the component is unmounted or task stops
    return () => {
      if (taskIntervalRef.current) {
        clearInterval(taskIntervalRef.current)
      }
    }
  }, [isTaskOngoing, startTime])

  // Update the task details when a task ends
  const handleEndTask = () => {
    if (startTime) {
      // Capture current task data before setting isTaskOngoing to false
      const endDateTime = new Date()

      const secondsElapsed = differenceInSeconds(endDateTime, startTime)

      // Convert secondsElapsed to HH:mm:ss format
      const durationTime = addSeconds(new Date(0, 0), secondsElapsed)

      // Create the task payload to be saved to localStorage (simulated server)
      const payload: TaskPayload = {
        taskName: capturedTask, // Use the captured task when Start was clicked
        startTime: startTime.toISOString(),
        endTime: endDateTime.toISOString(),
        duration: format(durationTime, 'HH:mm:ss'),
        createdAt: new Date().toISOString(),
        metadata: {
          userId: 123, // Example metadata, you can replace this with actual user info
          taskCategory: 'Productivity', // Example category
        },
      }

      // Log the captured task and payload for debugging
      console.log('Task Payload:', payload)

      // Persist the payload to localStorage
      saveTasksToLocalStorage(payload)

      // Mark the task as ended and reset state
      setIsTaskOngoing(false)
      clearTaskFromLocalStorage() // Clear the ongoing task from localStorage
      setCapturedTask('') // Clear captured task
      setStartTime(null) // Reset the start time
      setTaskChange(!taskChange) // Trigger a re-render
      setTaskTimer('00:00:00') // Reset timer after ending the task
    }
  }

  // Start a new task and reset previous task details
  const handleStartTask = () => {
    const now = new Date()
    setIsTaskOngoing(true)
    setCapturedTask(selectedTask) // Use the selected task
    setStartTime(now) // Set the new start time to the actual current date and time
    saveTaskToLocalStorage(selectedTask, now, taskChange) // Save to localStorage
    setShowTaskPicker(false)
  }

  return {
    isTaskOngoing,
    handleEndTask,
    handleStartTask,
    currentTask, // This is the dynamically updated task if the task is not ongoing
    selectedTask, // Task selected by the user
    showTaskPicker, // Show or hide task picker
    taskNames, // List of task names
    handleTaskSelection, // Function to handle task selection
    toggleTaskPicker, // Toggle task picker visibility
    currentDate,
    currentTime,
    startTime: startTime ? format(startTime, 'HH:mm') : '', // Format start time for display
    taskTimer,
  }
}
