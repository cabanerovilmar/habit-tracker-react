import { vi } from 'vitest'
import useThemeStore from '../index'

describe('useThemeStore', () => {
  beforeEach(() => {
    // Reset Zustand store between tests to avoid state leakage
    const { setState } = useThemeStore
    setState({ colorScheme: 'dark' })
    vi.clearAllMocks()
  })

  it('should initialize with the correct default state', () => {
    const state = useThemeStore.getState()
    expect(state.colorScheme).toBe('dark')
  })

  it('should allow colorScheme to be updated with setColorScheme', () => {
    const { setColorScheme, colorScheme } = useThemeStore.getState()

    expect(colorScheme).toBe('dark') // Check initial value

    // Update colorScheme using the action
    setColorScheme('light')
    expect(useThemeStore.getState().colorScheme).toBe('light') // Check updated value
  })
})
