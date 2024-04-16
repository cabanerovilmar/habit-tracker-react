import { useTheme } from '@mui/material'
import { useEffect } from 'react'

export function useUpdatePWAThemeColor() {
  const theme = useTheme()

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      console.log(theme.palette.background.default)
      metaThemeColor.setAttribute('content', theme.palette.background.default)
    }
  }, [theme.palette.background.default])
}
