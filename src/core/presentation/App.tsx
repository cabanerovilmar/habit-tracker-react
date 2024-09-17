import { Fragment } from 'react'
import { Box, Button, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import Card from './components/Card'

function App() {
  return (
    <Fragment>
      <CenteredMessage />
    </Fragment>
  )
}

export default App

function CenteredMessage() {
  const { toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  console.log(theme.primaryColor)

  return (
    <Box className="flex justify-center items-center h-screen text-center p-4">
      <Card className="max-w-3xl">
        <Text className="text-2xl md:text-4xl cursor-pointer p-2" onClick={() => toggleColorScheme()}>
          This website is under development.
        </Text>
        <Button className="w-60 self-center">Primary Button</Button>
      </Card>
    </Box>
  )
}
