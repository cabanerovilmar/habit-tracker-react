// App.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest'
import { App } from './App'
import { useMantineColorScheme } from '@mantine/core'
import { useUpdatePwaThemeColor } from './theme/useUpdatePwaThemeColor'
import { useSystemTheme } from '@/core/hooks/useSystemTheme'
import { AppThemeProvider } from './theme/AppThemeProvider'

// Mock the useUpdatePwaThemeColor hook
vi.mock('./theme/useUpdatePwaThemeColor', () => ({
  useUpdatePwaThemeColor: vi.fn(),
}))

beforeAll(() => {
  window.matchMedia = vi.fn()
})

// Mock the useSystemTheme hook
vi.mock('@/core/hooks/useSystemTheme', () => ({
  useSystemTheme: vi.fn(),
}))

// Mock the useMantineColorScheme hook
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core')
  return {
    ...actual,
    useMantineColorScheme: vi.fn(),
  }
})

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    // Mock useSystemTheme to return 'light'
    ;(useSystemTheme as Mock).mockReturnValue('light')

    // Mock useMantineColorScheme
    const toggleColorSchemeMock = vi.fn()
    ;(useMantineColorScheme as Mock).mockReturnValue({
      colorScheme: 'light',
      toggleColorScheme: toggleColorSchemeMock,
    })

    render(
      <AppThemeProvider>
        <App />
      </AppThemeProvider>,
    )

    // Check if the text is rendered
    expect(screen.getByText('This website is under development.')).toBeInTheDocument()
  })

  it('should call toggleColorScheme when text is clicked', () => {
    // Mock useSystemTheme to return 'light'
    ;(useSystemTheme as Mock).mockReturnValue('light')

    // Mock useMantineColorScheme
    const toggleColorSchemeMock = vi.fn()
    ;(useMantineColorScheme as Mock).mockReturnValue({
      colorScheme: 'light',
      toggleColorScheme: toggleColorSchemeMock,
    })

    render(
      <AppThemeProvider>
        <App />
      </AppThemeProvider>,
    )

    // Click the text
    const textElement = screen.getByText('This website is under development.')
    fireEvent.click(textElement)

    // Expect toggleColorScheme to have been called
    expect(toggleColorSchemeMock).toHaveBeenCalled()
  })

  it('should call useUpdatePwaThemeColor on render', () => {
    // Mock useSystemTheme to return 'light'
    ;(useSystemTheme as Mock).mockReturnValue('light')

    render(
      <AppThemeProvider>
        <App />
      </AppThemeProvider>,
    )

    // Expect useUpdatePwaThemeColor to have been called
    expect(useUpdatePwaThemeColor).toHaveBeenCalled()
  })
})
