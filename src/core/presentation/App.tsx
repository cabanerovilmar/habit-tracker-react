import { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import renderMathInElement from 'katex/contrib/auto-render'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { getTextboxBackground, getTextboxText } from '@/core/presentation/theme/themeColors.ts'

function App() {
  const [content, setContent] = useState('')

  const mathContainerRef = useRef(null)

  const theme = useTheme()

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
  }, [content]) // Re-render math when content changes

  // Function to escape LaTeX backslashes
  const escapeBackslashes = (text: string) => {
    return text.replace(/\\/g, '\\\\') // Double the backslashes to preserve them
  }

  // Use the imported color functions to get the appropriate colors based on the current theme mode
  const textboxBackground = getTextboxBackground(theme.palette.mode)
  const textboxText = getTextboxText(theme.palette.mode)

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        maxWidth: '712px',
        mx: 'auto',
        mt: 4,
        mb: 10,
        '@media (max-width: 712px)': {
          mx: 2,
        },
      }}
    >
      <Typography variant="h5" gutterBottom color={textboxText}>
        Markdown Editor
      </Typography>
      <textarea
        rows={1}
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{
          padding: '12px',
          backgroundColor: textboxBackground,
          color: textboxText,
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: 'inherit',
          outline: 'none',
          border: 'none',
          boxShadow: 'none',
          minHeight: '100px',
          resize: 'vertical',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      <Box ref={mathContainerRef} sx={{ padding: '0 10px' }}>
        {/* Escape backslashes before rendering Markdown */}
        <ReactMarkdown>{escapeBackslashes(content)}</ReactMarkdown>
      </Box>
    </Box>
  )
}

export default App
