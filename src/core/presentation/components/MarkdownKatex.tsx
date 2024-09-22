import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import renderMathInElement from 'katex/contrib/auto-render'
import { Box } from '@mantine/core'

// Define the props interface for the MarkdownKatex component
interface Props {
  content: string // The content string containing Markdown and KaTeX math syntax
}

export function MarkdownKatex(props: Props): JSX.Element {
  const { content } = props
  const mathContainerRef = useRef(null)

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
  }, [])

  // Function to escape LaTeX backslashes
  const escapeBackslashes = (text: string) => {
    return text.replace(/\\/g, '\\\\') // Double the backslashes to preserve them
  }

  return (
    <Box
      ref={mathContainerRef}
      className="[&_p]:mb-0 [&_p]:p-0 [&_li:first-of-type>p:first-of-type]:mt-[-8px] [&_ol]:pl-[-16px] [&_ul]:mt-[-8px]"
    >
      <ReactMarkdown>{escapeBackslashes(content)}</ReactMarkdown>
    </Box>
  )
}
