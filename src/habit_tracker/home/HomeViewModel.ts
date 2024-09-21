import { useState } from 'react'

export function HomeViewModel() {
  const [isTaskOngoing, setIsTaskOngoing] = useState(false)

  const handleEndTask = () => {
    setIsTaskOngoing(false)
  }

  const handleStartTask = () => {
    setIsTaskOngoing(true)
  }

  return {
    isTaskOngoing,
    handleEndTask,
    handleStartTask,
  }
}
