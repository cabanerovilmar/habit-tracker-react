import '@mantine/core/styles.css'
import React from 'react'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { theme } from './theme'

type Props = {
  children: React.ReactNode
}

export function AppThemeProvider({ children }: Props) {
  const colorScheme = useColorScheme()

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      {children}
    </MantineProvider>
  )
}
