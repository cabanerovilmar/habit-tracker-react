import { create } from 'zustand'
import { logger } from './logger'
import * as themeManager from '@/core/domain/ThemeManager'

type State = {
  isDarkMode: boolean
}

type Actions = {
  setIsDarkMode: (isDarkMode: boolean) => void
}

const initialState: State = {
  isDarkMode: themeManager.getDarkMode(),
}

const useThemeStore = create<State & Actions>()(
  logger<State & Actions>(
    set => ({
      ...initialState,
      setIsDarkMode: isDarkMode => set({ isDarkMode }),
    }),
    'themeStore',
  ),
)

export default useThemeStore
