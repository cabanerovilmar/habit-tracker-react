import React, { Fragment } from 'react'
import { Box, Text, useMantineColorScheme } from '@mantine/core'
import { useUpdatePwaThemeColor } from '@/core/presentation/theme/useUpdatePwaThemeColor'

export default function App() {
  useUpdatePwaThemeColor()

  return (
    <Fragment>
      <CenteredMessage />
    </Fragment>
  )
}

export const CenteredMessage: React.FC = () => {
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <Box className="flex justify-center items-center h-screen text-center p-4">
      <Text className="text-2xl md:text-4xl cursor-pointer p-2" onClick={() => toggleColorScheme()}>
        This website is under development.
      </Text>
    </Box>
  )
}
