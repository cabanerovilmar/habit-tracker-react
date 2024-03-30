// Import the functions from your theme.ts file
import { updatePWAThemeColor, watchThemeChanges } from '@/theme'

describe('theme.ts', () => {
  let matchMediaMock: jest.Mock

  beforeEach(() => {
    // Setup a fresh mock for matchMedia in each test
    matchMediaMock = jest.fn().mockImplementation(query => ({
      matches: query.includes('dark'), // Simulate dark mode if query includes 'dark'
      addEventListener: jest.fn(), // Mock addEventListener directly here
      removeEventListener: jest.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    })
  })

  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = ''
    // Add a dummy meta element for theme-color
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  })

  it('updatePWAThemeColor sets meta theme-color content to #000000 in dark mode', () => {
    // Force dark mode
    window.matchMedia = jest.fn().mockImplementation(_query => ({
      matches: true, // Simulate dark mode
    }))

    updatePWAThemeColor()

    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    expect(metaThemeColor).not.toBeNull()
    expect(metaThemeColor?.getAttribute('content')).toBe('#000000')
  })

  it('updatePWAThemeColor sets meta theme-color content to #FFFFFF in light mode', () => {
    // Force light mode
    window.matchMedia = jest.fn().mockImplementation(_query => ({
      matches: false, // Simulate light mode
    }))

    updatePWAThemeColor()

    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    expect(metaThemeColor).not.toBeNull()
    expect(metaThemeColor?.getAttribute('content')).toBe('#FFFFFF')
  })

  it('watchThemeChanges sets up event listener for color scheme changes', () => {
    watchThemeChanges()

    // Since matchMediaMock.mockImplementation returns an object with addEventListener mocked,
    // we need to verify that this mock function was called correctly.
    // Access the mock instance of addEventListener directly from the return value of matchMediaMock.
    const mockMediaQueryList = matchMediaMock.mock.results[0].value

    // Verify addEventListener was called on the mockMediaQueryList with the expected arguments.
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', updatePWAThemeColor)
  })
})
