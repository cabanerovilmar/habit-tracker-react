import React from 'react'
import App from '@/App'

// Create a dummy root div element
const rootElement = document.createElement('div')
rootElement.id = 'root'
document.body.appendChild(rootElement)

// Mock implementation for createRoot
const mockCreateRoot = jest.fn().mockImplementation(() => {
  return { render: jest.fn() }
})

// Mock the whole ReactDOMClient module and specifically the createRoot function
jest.mock('react-dom/client', () => ({
  ...jest.requireActual('react-dom/client'),
  createRoot: mockCreateRoot,
}))

describe('main.tsx', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockCreateRoot.mockClear()

    // Mock implementation of window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => {
        let onchangeHandler: ((e: MediaQueryListEvent) => void) | null = null // Holds the reference to the event handler

        return {
          matches: query.includes('dark'), // Simulate dark mode if query includes 'dark'
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated but included for completeness
          removeListener: jest.fn(), // Deprecated but included for completeness
          addEventListener: jest.fn((_event, handler) => {
            // Assign the handler to onchangeHandler
            onchangeHandler = handler
          }),
          removeEventListener: jest.fn((_event, handler) => {
            // Clear onchangeHandler if it matches the handler
            if (onchangeHandler === handler) {
              onchangeHandler = null
            }
          }),
        }
      }),
    })
  })

  it('renders without crashing', () => {
    // Dynamically import the main.tsx file after setting up the environment and mocks
    require('../src/main')

    // Check if createRoot was called with the root element
    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement)

    // Assuming the render method of the returned object from createRoot is also mocked,
    // you can check if it's called with the expected JSX.
    const renderCall = mockCreateRoot.mock.results[0].value.render
    expect(renderCall).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  })
})
