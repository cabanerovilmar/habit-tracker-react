import * as themeManager from '@/core/domain/ThemeManager'
import useThemeStore from '@/core/presentation/store'

export function AppViewModel() {
  const isDarkMode = useThemeStore(state => state.isDarkMode)
  const setIsDarkMode = useThemeStore(state => state.setIsDarkMode)

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    themeManager.setDarkMode(newMode)
  }

  return {
    isDarkMode,
    toggleDarkMode,
  }
}
