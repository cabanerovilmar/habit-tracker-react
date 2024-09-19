import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useSystemTheme } from '../useSystemTheme'

describe('useSystemTheme', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>
  let mockAddEventListener: ReturnType<typeof vi.fn>
  let mockRemoveEventListener: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockAddEventListener = vi.fn()
    mockRemoveEventListener = vi.fn()

    mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }))

    vi.stubGlobal('matchMedia', mockMatchMedia)
  })

  it('should return "light" when prefers-color-scheme is not dark', () => {
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current).toBe('light')
  })

  it('should return "dark" when prefers-color-scheme is dark', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }))

    const { result } = renderHook(() => useSystemTheme())
    expect(result.current).toBe('dark')
  })

  it('should add event listener on mount', () => {
    renderHook(() => useSystemTheme())
    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should remove event listener on unmount', () => {
    const { unmount } = renderHook(() => useSystemTheme())
    unmount()
    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should update theme when media query changes', () => {
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current).toBe('light')

    act(() => {
      const changeEvent = new Event('change')
      Object.defineProperty(changeEvent, 'matches', { value: true })
      mockAddEventListener.mock.calls[0][1](changeEvent)
    })

    expect(result.current).toBe('dark')
  })
})
