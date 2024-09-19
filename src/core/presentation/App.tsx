import React, { Fragment } from 'react'
import { Box, Text, useMantineColorScheme } from '@mantine/core'
import { useUpdatePwaThemeColor } from './theme/useUpdatePwaThemeColor'

export const App: React.FC = () => {
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
