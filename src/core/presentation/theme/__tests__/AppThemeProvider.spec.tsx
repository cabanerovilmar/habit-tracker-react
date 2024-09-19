// AppThemeProvider.spec.tsx
import { render } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { AppThemeProvider } from '../AppThemeProvider'
import { vi } from 'vitest'
import * as useSystemThemeHook from '@/core/hooks/useSystemTheme'

// Mock MantineProvider
vi.mock('@mantine/core', async () => {
  const originalModule = await vi.importActual<typeof import('@mantine/core')>('@mantine/core')
  return {
    ...originalModule,
    MantineProvider: vi.fn(({ children }) => <div>{children}</div>), // Mock MantineProvider to inspect its props
  }
})

beforeAll(() => {
  window.matchMedia = vi.fn()
})

vi.mock('@/core/hooks/useSystemTheme')

describe('AppThemeProvider', () => {
  it('passes the correct color scheme to MantineProvider (dark mode)', () => {
    // Mock the useSystemTheme to return 'dark'
    const useSystemTheme = vi.spyOn(useSystemThemeHook, 'useSystemTheme').mockReturnValue('dark')

    const { getByText } = render(
      <AppThemeProvider>
        <div>Test Child</div>
      </AppThemeProvider>,
    )

    // Check if the child is rendered
    expect(getByText('Test Child')).toBeInTheDocument()

    // Ensure MantineProvider received the correct defaultColorScheme
    expect(MantineProvider).toHaveBeenCalledWith(
      expect.objectContaining({ defaultColorScheme: 'dark' }),
      expect.anything(),
    )

    // Restore the mock after test
    useSystemTheme.mockRestore()
  })

  it('passes the correct color scheme to MantineProvider (light mode)', () => {
    // Mock the useSystemTheme to return 'light'
    const useSystemTheme = vi.spyOn(useSystemThemeHook, 'useSystemTheme').mockReturnValue('light')

    const { getByText } = render(
      <AppThemeProvider>
        <div>Test Child</div>
      </AppThemeProvider>,
    )

    // Check if the child is rendered
    expect(getByText('Test Child')).toBeInTheDocument()

    // Ensure MantineProvider received the correct defaultColorScheme
    expect(MantineProvider).toHaveBeenCalledWith(
      expect.objectContaining({ defaultColorScheme: 'light' }),
      expect.anything(),
    )

    useSystemTheme.mockRestore()
  })
})
