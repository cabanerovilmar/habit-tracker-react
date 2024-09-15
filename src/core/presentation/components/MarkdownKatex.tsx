// TODO: Create unit test if it correctly renders normal text, with markdown, and with katex. Or any other edge cases.

import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import renderMathInElement from 'katex/contrib/auto-render'
import { Box } from '@mui/material'

// Define the props interface for the MarkdownKatex component
interface Props {
  content: string // The content string containing Markdown and KaTeX math syntax
}

export function MarkdownKatex(props: Props) {
  const mathContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Render KaTeX math inside the parsed Markdown content
    if (mathContainerRef.current) {
      renderMathInElement(mathContainerRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
        throwOnError: false,
      })
    }
  }, [props.content]) // Re-render math when content changes

  // Function to escape LaTeX backslashes
  const escapeBackslashes = (text: string) => {
    return text.replace(/\\/g, '\\\\') // Double the backslashes to preserve them
  }

  return (
    <Box
      ref={mathContainerRef}
      sx={{
        padding: 0,
        margin: 0,
        fontSize: '16px',
        tabSize: 4,
        fontWeight: 'normal',
        '& p': {
          marginBottom: 0,
          padding: 0,
        },
        '& li:first-of-type > p:first-of-type': {
          marginTop: '-16px',
        },
        '& ol': {
          paddingLeft: '16px',
        },
        '& ul': {
          margin: 0,
        },
      }}
    >
      <ReactMarkdown>{escapeBackslashes(props.content)}</ReactMarkdown>
    </Box>
  )
}
