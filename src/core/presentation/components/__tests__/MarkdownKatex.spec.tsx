import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MarkdownKatex } from '../MarkdownKatex'

// Mock dependencies
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => <div data-testid="react-markdown">{children}</div>,
}))

vi.mock('katex/contrib/auto-render', () => ({
  default: vi.fn(),
}))

vi.mock('@mantine/core', () => ({
  // Forward ref in Box mock to avoid ref warning and properly type ref as HTMLDivElement
  Box: React.forwardRef<HTMLDivElement, { children: React.ReactNode; className: string }>(
    ({ children, className }, ref) => (
      <div data-testid="mantine-box" className={className} ref={ref}>
        {children}
      </div>
    ),
  ),
}))

describe('MarkdownKatex', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders markdown content', () => {
    const content = 'This is **bold** and *italic* text'
    render(<MarkdownKatex content={content} />)

    const markdownElement = screen.getByTestId('react-markdown')
    expect(markdownElement).toHaveTextContent(content)
  })

  it('escapes backslashes in LaTeX content', () => {
    const content = 'Equation: \\(\\alpha + \\beta = \\gamma\\)'
    render(<MarkdownKatex content={content} />)

    const markdownElement = screen.getByTestId('react-markdown')
    expect(markdownElement).toHaveTextContent('Equation: \\\\(\\\\alpha + \\\\beta = \\\\gamma\\\\)')
  })

  it('applies correct CSS classes to the Box component', () => {
    const content = 'Some content'
    render(<MarkdownKatex content={content} />)

    const boxElement = screen.getByTestId('mantine-box')
    expect(boxElement).toHaveClass(
      '[&_p]:mb-0',
      '[&_p]:p-0',
      '[&_li:first-of-type>p:first-of-type]:mt-[-8px]',
      '[&_ol]:pl-[-16px]',
      '[&_ul]:mt-[-8px]',
    )
  })
})
