import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import useThemeStore from '@/core/presentation/store'
import { CssBaseline } from '@mui/material'
import { useCreateMuiTheme } from './useCreateMuiTheme'

type Props = {
  children: React.ReactNode
}

export function AppThemeProvider(props: Props) {
  const darkModeSetting = useThemeStore(state => state.darkModeSetting)

  const theme = useCreateMuiTheme(darkModeSetting)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}
