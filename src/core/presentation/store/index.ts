// This should not be used anymore as Mantine will handle theme state
// This will serve as a guide for the future usage

import { create } from 'zustand'
import { logger } from './logger'

type ColorScheme = 'dark' | 'light' | 'auto'

type State = {
  colorScheme: ColorScheme
}

type Actions = {
  setColorScheme: (colorScheme: ColorScheme) => void
}

const initialState: State = {
  colorScheme: 'dark',
}

const useThemeStore = create<State & Actions>()(
  logger<State & Actions>(
    set => ({
      ...initialState,
      setColorScheme: colorScheme => {
        set({ colorScheme })
      },
    }),
    'themeStore',
  ),
)

export default useThemeStore
