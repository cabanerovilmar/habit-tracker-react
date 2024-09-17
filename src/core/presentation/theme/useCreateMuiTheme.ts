import { useEffect, useState, useMemo } from 'react'
import { DarkModeSetting } from '@/core/utils/type'
import { createMuiTheme } from './createMuiTheme'

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
    const isDarkMode = darkModeSetting === 'dark' || (darkModeSetting === 'auto' && systemPrefersDark)

    return createMuiTheme(isDarkMode)
  }, [darkModeSetting, systemPrefersDark])

  return theme
}
