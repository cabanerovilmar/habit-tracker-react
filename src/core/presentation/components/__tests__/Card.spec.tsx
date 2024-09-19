import { vi, Mock } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'
import { useMantineColorScheme } from '@mantine/core'

// Mock the Mantine components and hooks
vi.mock('@mantine/core', () => ({
  Card: ({ children, withBorder, ...rest }: { children: React.ReactNode; withBorder: boolean }) => (
    <div data-testid="mantine-card" style={{ borderWidth: withBorder ? '1px' : '0px' }} {...rest}>
      {children}
    </div>
  ),
  useMantineColorScheme: vi.fn(),
}))

describe('Card', () => {
  it('renders with a border when color scheme is light', () => {
    vi.mocked(useMantineColorScheme as Mock).mockReturnValue({ colorScheme: 'light' })

    render(<Card>Test Content</Card>)

    const card = screen.getByTestId('mantine-card')
    expect(card).toHaveStyle('border-width: 1px')
  })

  it('renders without a border when color scheme is dark', () => {
    vi.mocked(useMantineColorScheme as Mock).mockReturnValue({ colorScheme: 'dark' })

    render(<Card>Test Content</Card>)

    const card = screen.getByTestId('mantine-card')
    expect(card).toHaveStyle('border-width: 0px')
  })

  it('passes additional props to MantineCard', () => {
    vi.mocked(useMantineColorScheme as Mock).mockReturnValue({ colorScheme: 'light' })

    render(<Card data-custom="test-value">Test Content</Card>)

    const card = screen.getByTestId('mantine-card')
    expect(card).toHaveAttribute('data-custom', 'test-value')
  })
})
