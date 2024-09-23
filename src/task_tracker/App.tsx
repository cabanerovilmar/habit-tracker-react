import { Fragment } from 'react'
import { Box, Text, useMantineColorScheme } from '@mantine/core'
import { useUpdatePwaThemeColor } from '@/core/presentation/theme/useUpdatePwaThemeColor'

export default function App(): JSX.Element {
  useUpdatePwaThemeColor()

  return (
    <Fragment>
      <CenteredMessage />
    </Fragment>
  )
}

export function CenteredMessage(): JSX.Element {
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <Box className="flex justify-center items-center h-screen text-center p-4">
      <Text className="text-2xl md:text-4xl cursor-pointer p-2" onClick={() => toggleColorScheme()}>
        This website is under development.
      </Text>
    </Box>
  )
}
