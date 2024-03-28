import { fireEvent, render, screen } from '@testing-library/react'
import App from '@/App'

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  test('initial count is 0', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
  })

  test('clicking button increments count', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })

  test('contains link to Vite and React documentation', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Vite logo' })).toHaveAttribute('href', 'https://vitejs.dev')
    expect(screen.getByRole('link', { name: 'React logo' })).toHaveAttribute('href', 'https://react.dev')
  })
})
