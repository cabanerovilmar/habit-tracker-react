import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useUpdatePwaThemeColor } from '../useUpdatePwaThemeColor'
import { useMantineColorScheme } from '@mantine/core'
import type { Mock } from 'vitest'

// Mock the @mantine/core module and replace useMantineColorScheme with a mock function
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core')
  return {
    ...actual,
    useMantineColorScheme: vi.fn(),
  }
})

// Create reusable mock setup function for Mantine's useMantineColorScheme
const mockMantineColorScheme = (colorScheme: 'light' | 'dark') => {
  // Cast useMantineColorScheme to a Vitest Mock function
  ;(useMantineColorScheme as Mock).mockReturnValue({
    colorScheme,
    setColorScheme: vi.fn(),
    clearColorScheme: vi.fn(),
    toggleColorScheme: vi.fn(),
  })
}

// Reusable setup for document.querySelector mock
const setupMetaTagMock = (): HTMLMetaElement => {
  const metaTagMock = document.createElement('meta')
  metaTagMock.setAttribute('name', 'theme-color')
  document.head.appendChild(metaTagMock)

  // Mock document.querySelector to return the mock meta tag
  vi.spyOn(document, 'querySelector').mockReturnValue(metaTagMock)

  return metaTagMock
}

describe('useUpdatePwaThemeColor', () => {
  let metaTagMock: HTMLMetaElement

  beforeEach(() => {
    metaTagMock = setupMetaTagMock()
  })

  afterEach(() => {
    document.head.removeChild(metaTagMock)
    vi.restoreAllMocks()
  })

  it('sets meta theme color to dark mode color', () => {
    // Use the helper function to mock the color scheme as 'dark'
    mockMantineColorScheme('dark')

    // Run the hook in a testing environment
    renderHook(() => useUpdatePwaThemeColor())

    // Assert that the correct color for dark mode is set
    expect(metaTagMock.getAttribute('content')).toBe('#212121')
  })

  it('sets meta theme color to light mode color', () => {
    // Use the helper function to mock the color scheme as 'light'
    mockMantineColorScheme('light')

    // Run the hook in a testing environment
    renderHook(() => useUpdatePwaThemeColor())

    // Assert that the correct color for light mode is set
    expect(metaTagMock.getAttribute('content')).toBe('#ffffff')
  })

  it('does nothing if no meta tag is present', () => {
    // Mock the color scheme as 'dark' using the helper function
    mockMantineColorScheme('dark')

    // Spy on document.querySelector to return null (no meta tag found)
    vi.spyOn(document, 'querySelector').mockReturnValue(null)

    // Run the hook in a testing environment
    renderHook(() => useUpdatePwaThemeColor())

    // Since no meta tag was found, no changes should be made
    expect(metaTagMock.getAttribute('content')).not.toBe('#212121')
  })
})
