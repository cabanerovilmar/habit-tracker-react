import { Fragment } from 'react'
import { Box, Text, useMantineColorScheme } from '@mantine/core'
import { Card } from './components/Card'
import { useUpdatePwaThemeColor } from './theme/useUpdatePwaThemeColor'

export function App() {
  useUpdatePwaThemeColor()

  return (
    <Fragment>
      <CenteredMessage />
    </Fragment>
  )
}

function CenteredMessage() {
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <Box className="flex justify-center items-center h-screen text-center p-4">
      <Card className="max-w-3xl">
        <Text className="text-2xl md:text-4xl cursor-pointer p-2" onClick={() => toggleColorScheme()}>
          This website is under development.
        </Text>
      </Card>
    </Box>
  )
}
