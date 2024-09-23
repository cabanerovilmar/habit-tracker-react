import { Icon } from '@iconify/react'
import { Box, Button, Text } from '@mantine/core'
import { HomeViewModel } from './HomeViewModel'
import { TaskSelect } from './components/TaskSelect'
import { Card } from '@/core/presentation/components/Card'

export default function Home(): JSX.Element {
  const viewModel = HomeViewModel()

  return (
    <Box className="h-[100vh] flex justify-center items-center">
      <Card className="h-[100vh] w-full mx-auto sm:w-[480px] sm:h-[70vh] rounded-none sm:rounded-lg">
        <Box className="flex justify-between items-center p-4 pt-0">
          <Icon icon="simple-line-icons:menu" />
          <Box>{viewModel.currentDate}</Box>
        </Box>

        <Box className="flex justify-center items-center text-center h-[100vh] sm:h-[70vh]">
          <Box
            className="w-full h-[100vh] absolute top-0"
            onClick={!viewModel.isTaskOngoing && viewModel.showTaskPicker ? viewModel.toggleTaskPicker : undefined}
          />
          <Box
            className={`flex w-full justify-between items-center z-10 py-2 ${viewModel.isTaskOngoing ? 'cursor-default' : 'cursor-pointer'} ${viewModel.showTaskPicker ? 'hidden' : 'block'}`}
            onClick={!viewModel.isTaskOngoing ? viewModel.toggleTaskPicker : undefined}
          >
            <Text className="flex-grow text-center ml-5">{viewModel.selectedTask}</Text>
            <Icon
              icon="iconamoon:arrow-down-2-duotone"
              className={`text-xl w-5 ${viewModel.isTaskOngoing ? 'hidden' : 'block'}`}
            />
            <Box className={`w-5 ${!viewModel.isTaskOngoing ? 'hidden' : 'block'}`} />
          </Box>

          {viewModel.showTaskPicker && <TaskSelect viewModel={viewModel} />}
        </Box>

        <Box className="flex justify-between items-center p-4 pb-0">
          <Text className="w-[58.69px]">{viewModel.isTaskOngoing ? viewModel.startTime : viewModel.currentTime}</Text>

          {viewModel.isTaskOngoing ? (
            <Button onClick={viewModel.handleEndTask} color="red" className="w-20">
              End
            </Button>
          ) : (
            <Button onClick={viewModel.handleStartTask} color="green" className="w-20">
              Start
            </Button>
          )}

          <Text className="w-[58.69px]">{viewModel.taskTimer}</Text>
        </Box>
      </Card>
    </Box>
  )
}
