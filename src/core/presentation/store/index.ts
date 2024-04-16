import { create } from 'zustand'
import { logger } from './logger'
import * as themeManager from '@/core/domain/theme-manager'
import { DarkModeSetting } from '@/core/utils/type'

type State = {
  darkModeSetting: DarkModeSetting
}

type Actions = {
  setDarkMode: (mode: DarkModeSetting) => void
}

const initialState: State = {
  darkModeSetting: themeManager.getDarkMode(),
}

const useThemeStore = create<State & Actions>()(
  logger<State & Actions>(
    set => ({
      ...initialState,
      setDarkMode: darkModeSetting => {
        set({ darkModeSetting })
        themeManager.setDarkMode(darkModeSetting)
      },
    }),
    'themeStore',
  ),
)

export default useThemeStore
