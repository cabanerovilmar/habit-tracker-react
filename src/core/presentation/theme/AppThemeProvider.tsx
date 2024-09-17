import '@mantine/core/styles.css'
import React from 'react'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'

type Props = {
  children: React.ReactNode
}

export function AppThemeProvider({ children }: Props) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  )
}

export default AppThemeProvider
