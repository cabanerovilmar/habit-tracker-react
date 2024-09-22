import { Fragment } from 'react'
import { Icon } from '@iconify/react'
import { Box, Button, Text, Select } from '@mantine/core' // Import Select from Mantine
import { HomeViewModel, IHomeViewModel } from './HomeViewModel'

export default function Home(): JSX.Element {
  const viewModel = HomeViewModel()

  return (
    <Fragment>
      {/* Header with current date */}
      <Box className="flex justify-between items-center p-4 pt-0 h-[10vh]">
        <Icon icon="simple-line-icons:menu" />
        <Box>{viewModel.currentDate}</Box>
      </Box>

      {/* Main content with current task */}
      <Box className="flex justify-center items-center text-center p-4 h-[80vh]">
        <Box
          className={`flex w-full justify-between items-center ${viewModel.showTaskPicker ? 'hidden' : 'block'}`}
          onClick={viewModel.toggleTaskPicker}
        >
          <Text className="flex-grow text-center">{viewModel.selectedTask}</Text>
          <Icon icon="iconamoon:arrow-down-2-duotone" className="text-xl" />
        </Box>

        {viewModel.showTaskPicker && <TaskSelect viewModel={viewModel} />}
      </Box>

      {/* Footer with start time, task timer, and task duration */}
      <Box className="flex justify-between items-center p-4 pb-0 h-[10vh]">
        <Text>{viewModel.isTaskOngoing ? viewModel.startTime : viewModel.currentTime}</Text>

        {viewModel.isTaskOngoing ? (
          <Button onClick={viewModel.handleEndTask} color="red" className="w-20">
            End
          </Button>
        ) : (
          <Button onClick={viewModel.handleStartTask} color="green" className="w-20">
            Start
          </Button>
        )}

        <Text>{viewModel.taskTimer}</Text>
      </Box>
    </Fragment>
  )
}

type Props = {
  viewModel: IHomeViewModel
}

function TaskSelect({ viewModel }: Props) {
  return (
    <Select
      data={viewModel.taskNames} // Set the task names as options
      value={viewModel.selectedTask}
      onChange={viewModel.handleTaskSelection}
      placeholder="Pick a task"
      className="w-full"
      autoFocus // Automatically focus the Select when it is shown
      dropdownOpened // Ensure the dropdown is opened when the Select is rendered
    />
  )
}
