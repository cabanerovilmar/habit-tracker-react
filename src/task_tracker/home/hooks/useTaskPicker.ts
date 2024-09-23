import { useState } from 'react'
import tasks from '../tasks.json' // Import tasks from JSON

interface UseTaskPickerResult {
  selectedTask: string
  showTaskPicker: boolean
  taskNames: { value: string; label: string }[]
  handleTaskSelection: (value: string | null) => void
  toggleTaskPicker: () => void
}

export function useTaskPicker(initialTask: string): UseTaskPickerResult {
  const [showTaskPicker, setShowTaskPicker] = useState(false) // To toggle Select dropdown
  const [selectedTask, setSelectedTask] = useState(initialTask) // Task selected by the user

  // Get task names from tasks.json
  const taskNames = tasks.map(task => ({ value: task.taskName, label: task.taskName }))

  // Handle when the user selects a new task
  const handleTaskSelection = (value: string | null) => {
    if (value) {
      setSelectedTask(value) // Update the selected task
    }
    setShowTaskPicker(false) // Hide the Select dropdown
  }

  // Toggle the task picker visibility
  const toggleTaskPicker = () => setShowTaskPicker(prev => !prev)

  return {
    selectedTask,
    showTaskPicker,
    taskNames,
    handleTaskSelection,
    toggleTaskPicker,
  }
}
