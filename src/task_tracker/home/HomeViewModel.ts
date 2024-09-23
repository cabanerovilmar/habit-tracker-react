import { useState, useEffect, useRef } from 'react'
import { format, differenceInSeconds, addSeconds } from 'date-fns'
import tasks from './data/tasks.json'
import { useCurrentTask } from './hooks/useCurrentTask'
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
  const [capturedTask, setCapturedTask] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')
  const [currentTime, setCurrentTime] = useState<string>('')
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [taskTimer, setTaskTimer] = useState<string | null>(null)
  const [showTaskPicker, setShowTaskPicker] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string>(useCurrentTask(false, taskChange))
  const taskIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const taskNames = tasks.map(task => ({ value: task.taskName, label: task.taskName }))

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

  const toggleTaskPicker = () => setShowTaskPicker(prev => !prev)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentDate(format(now, 'EEEE, MMM d'))
      setCurrentTime(format(now, 'HH:mm'))
    }

    updateDateTime()
    const intervalId = setInterval(updateDateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (isTaskOngoing && startTime) {
      taskIntervalRef.current = setInterval(() => {
        const now = new Date()
        const secondsElapsed = differenceInSeconds(now, startTime)

        const hours = Math.floor(secondsElapsed / 3600)
        const minutes = Math.floor((secondsElapsed % 3600) / 60)
        const seconds = secondsElapsed % 60

        setTaskTimer(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        )
      }, 1000)
    } else {
      if (taskIntervalRef.current) {
        clearInterval(taskIntervalRef.current)
      }
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
      setTaskChange(!taskChange)
      setTaskTimer('00:00:00')
    }
  }

  const handleStartTask = () => {
    const now = new Date()
    setIsTaskOngoing(true)
    setCapturedTask(selectedTask)
    setStartTime(now)
    saveTaskToLocalStorage(selectedTask, now, taskChange)
    setShowTaskPicker(false)
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
    currentTime,
    startTime: startTime ? format(startTime, 'HH:mm') : '',
    taskTimer,
  }
}
