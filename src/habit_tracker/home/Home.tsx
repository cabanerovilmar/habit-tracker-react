import { Fragment } from 'react'
import { Icon } from '@iconify/react'
import { Box } from '@mantine/core'
import { HomeViewModel } from './HomeViewModel'
import { OutlinedButton } from '@/core/presentation/components/OutlinedButton'
import { Text } from '@/core/presentation/components/Text'

export default function Home() {
  const viewModel = HomeViewModel()

  return (
    <Fragment>
      <Box className="flex justify-between items-center p-4 pt-0 h-[10vh]">
        <Icon icon="simple-line-icons:menu" />
        <Text>Saturday, Sep 21</Text>
      </Box>

      <Box className="flex justify-center items-center text-center p-4 h-[80vh]">
        <Text className="text-2xl">Work</Text>
      </Box>

      <Box className="flex justify-between items-center p-4 pb-0 h-[10vh]">
        <Text>17:24</Text>
        {viewModel.isTaskOngoing ? (
          <OutlinedButton onClick={viewModel.handleEndTask}>End</OutlinedButton>
        ) : (
          <OutlinedButton onClick={viewModel.handleStartTask}>Start</OutlinedButton>
        )}
        <Text>00:00</Text>
      </Box>
    </Fragment>
  )
}
