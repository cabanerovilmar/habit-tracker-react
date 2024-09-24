import { useState, useEffect, useRef } from 'react'
import { format, differenceInSeconds, addSeconds } from 'date-fns'
import { saveTasksToLocalStorage } from './data/tasksStorage'
import tasks from './data/tasks.json'
import { getCurrentTask } from './domain/getCurrentTask'

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
  selectedTask: string
  showTaskPicker: boolean
  taskNames: { value: string; label: string }[]
  handleTaskSelection: (value: string | null) => void
  toggleTaskPicker: () => void
  currentDate: string
  currentTime: string
  startTime: string
  taskTimer: string | null
  showTimeInput: boolean
  toggleTimeInput: () => void
  handleTimeChange: (newTime: string) => void
  timeInputValue: string
  setTimeInputValue: (value: string) => void
}

export function HomeViewModel(): IHomeViewModel {
  const [isTaskOngoing, setIsTaskOngoing] = useState<boolean>(false)
  const [capturedTask, setCapturedTask] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')
  const [currentTime, setCurrentTime] = useState<string>('')
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [taskTimer, setTaskTimer] = useState<string | null>('00:00:00')
  const [showTaskPicker, setShowTaskPicker] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string>('')
  const [showTimeInput, setShowTimeInput] = useState(false)
  const [timeInputValue, setTimeInputValue] = useState('')
  const [taskPickerTouched, setTaskPickerTouched] = useState(false)
  const taskIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fetchIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchTasks = () => {
    const currentTask = getCurrentTask(tasks)
    setSelectedTask(currentTask)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    if (!isTaskOngoing && !taskPickerTouched) {
      fetchIntervalRef.current = setInterval(fetchTasks, 1000)
    } else if (fetchIntervalRef.current) {
      clearInterval(fetchIntervalRef.current)
    }

    return () => {
      if (fetchIntervalRef.current) {
        clearInterval(fetchIntervalRef.current)
      }
    }
  }, [isTaskOngoing, taskPickerTouched])

  const taskNames = tasks.map(task => ({ value: task.taskName, label: task.taskName }))

  const saveTaskToLocalStorage = (taskName: string, startTime: Date) => {
    localStorage.setItem(
      'ongoingTask',
      JSON.stringify({
        taskName,
        startTime: startTime.toISOString(),
      }),
    )
  }

  const restoreTaskFromLocalStorage = () => {
    const savedTask = localStorage.getItem('ongoingTask')
    if (savedTask) {
      const { taskName, startTime } = JSON.parse(savedTask)
      const restoredStartTime = new Date(startTime)
      setCapturedTask(taskName)
      setSelectedTask(taskName)
      setStartTime(restoredStartTime)
      setIsTaskOngoing(true)

      const now = new Date()
      const secondsElapsed = differenceInSeconds(now, restoredStartTime)
      const initialTimer = format(addSeconds(new Date(0, 0), secondsElapsed), 'HH:mm:ss')
      setTaskTimer(initialTimer)
    } else {
      setTaskTimer('00:00:00')
    }
  }

  const clearTaskFromLocalStorage = () => {
    localStorage.removeItem('ongoingTask')
  }

  useEffect(() => {
    restoreTaskFromLocalStorage()
  }, [])

  const handleTaskSelection = (value: string | null) => {
    if (value) {
      setSelectedTask(value)
    }
    setShowTaskPicker(false)
  }

  const toggleTaskPicker = () => {
    setShowTaskPicker(prev => !prev)
    setTaskPickerTouched(true)
  }

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDate(format(now, 'EEEE, MMM d'))
      setCurrentTime(format(now, 'hh:mm a'))
    }

    updateDateTime()
    const intervalId = setInterval(updateDateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const updateTaskTimer = (start: Date) => {
    const now = new Date()
    const secondsElapsed = differenceInSeconds(now, start)

    // Ensure we always have a positive number of seconds
    const positiveSeconds = Math.max(0, secondsElapsed)

    const hours = Math.floor(positiveSeconds / 3600)
    const minutes = Math.floor((positiveSeconds % 3600) / 60)
    const seconds = positiveSeconds % 60

    setTaskTimer(
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    )
  }

  useEffect(() => {
    if (isTaskOngoing && startTime) {
      updateTaskTimer(startTime)
      taskIntervalRef.current = setInterval(() => updateTaskTimer(startTime), 1000)
    } else {
      if (taskIntervalRef.current) {
        clearInterval(taskIntervalRef.current)
      }
      setTaskTimer('00:00:00')
    }

    return () => {
      if (taskIntervalRef.current) {
        clearInterval(taskIntervalRef.current)
      }
    }
  }, [isTaskOngoing, startTime])

  const handleEndTask = () => {
    if (startTime) {
      const endDateTime = new Date()

      const secondsElapsed = differenceInSeconds(endDateTime, startTime)

      const durationTime = addSeconds(new Date(0, 0), secondsElapsed)

      const payload: TaskPayload = {
        taskName: capturedTask,
        startTime: startTime.toISOString(),
        endTime: endDateTime.toISOString(),
        duration: format(durationTime, 'HH:mm:ss'),
        createdAt: new Date().toISOString(),
        metadata: {
          userId: 123,
          taskCategory: 'Productivity',
        },
      }

      console.log('Task Payload:', payload)

      saveTasksToLocalStorage(payload)

      setIsTaskOngoing(false)
      clearTaskFromLocalStorage()
      setCapturedTask('')
      setStartTime(null)
      fetchTasks()
      setTaskTimer('00:00:00')
    }
  }

  const handleStartTask = () => {
    const taskStartTime = startTime || new Date()
    setIsTaskOngoing(true)
    setCapturedTask(selectedTask)
    setStartTime(taskStartTime)
    saveTaskToLocalStorage(selectedTask, taskStartTime)
    setShowTaskPicker(false)
    // Start the timer immediately
    updateTaskTimer(taskStartTime)
  }

  const toggleTimeInput = () => {
    setShowTimeInput(prev => !prev)
    setTimeInputValue(startTime ? format(startTime, 'HH:mm') : format(new Date(), 'HH:mm'))
  }

  const handleTimeChange = (newTime: string) => {
    const [hours, minutes] = newTime.split(':')
    const newDate = new Date()
    newDate.setHours(parseInt(hours, 10))
    newDate.setMinutes(parseInt(minutes, 10))
    newDate.setSeconds(0)
    setStartTime(newDate)
    setShowTimeInput(false)

    if (isTaskOngoing) {
      // If a task is ongoing, update the timer immediately
      updateTaskTimer(newDate)
    } else {
      // If no task is ongoing, just reset the timer
      setTaskTimer('00:00:00')
    }
  }

  return {
    isTaskOngoing,
    handleEndTask,
    handleStartTask,
    selectedTask,
    showTaskPicker,
    taskNames,
    handleTaskSelection,
    toggleTaskPicker,
    currentDate,
    currentTime: startTime ? format(startTime, 'hh:mm a') : currentTime,
    startTime: startTime ? format(startTime, 'hh:mm a') : '',
    taskTimer,
    showTimeInput,
    toggleTimeInput,
    handleTimeChange,
    timeInputValue,
    setTimeInputValue,
  }
}
