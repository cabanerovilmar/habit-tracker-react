import { useEffect, useState, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'
import { DarkModeSetting } from '@/core/utils/type'

export const useSystemTheme = () => {
  const [prefersDark, setPrefersDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersDark
}

export const useCreateMuiTheme = (darkModeSetting: DarkModeSetting) => {
  const systemPrefersDark = useSystemTheme()

  const theme = useMemo(() => {
    const isDarkMode = darkModeSetting === 'on' || (darkModeSetting === 'system' && systemPrefersDark)

    return createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
            },
          },
        },
      },
    })
  }, [darkModeSetting, systemPrefersDark])

  return theme
}
