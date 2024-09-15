import { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import renderMathInElement from 'katex/contrib/auto-render'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { getTextboxBackground, getTextboxText } from '@/core/presentation/theme/themeColors.ts'
import { useUpdatePWAThemeColor } from '@/core/presentation/theme/useUpdatePWAThemeColor'
import useThemeStore from '@/core/presentation/store'

import data from './02-compound-interest.json'

export default function MarkdownEditor() {
  useUpdatePWAThemeColor()

  const [content, setContent] = useState(data.content)

  const mathContainerRef = useRef(null)

  const theme = useTheme()

  const { darkModeSetting, setDarkMode } = useThemeStore(state => ({
    darkModeSetting: state.darkModeSetting,
    setDarkMode: state.setDarkMode,
  }))

  const handleClearInput = () => {
    setContent('')
  }

  const handleToggleDarkmode = () => {
    if (darkModeSetting === 'on') {
      setDarkMode('off')
    } else {
      setDarkMode('on')
    }
  }

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

  // Add event listener for Ctrl key
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the Ctrl key and the V key are pressed together
      if (event.ctrlKey && event.key === 'v') {
        handleClearInput()
      }
    }

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, []) // Empty dependency array means this runs once when the component mounts

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
        maxWidth: '732px',
        mx: 'auto',
        mt: 4,
        mb: 10,
        '@media (max-width: 722px)': {
          mx: 2,
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        color={textboxText}
        onClick={handleToggleDarkmode}
        sx={{ cursor: 'pointer' }}
      >
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
      <Box
        ref={mathContainerRef}
        style={{
          padding: '0 10px',
        }}
      >
        {/* Escape backslashes before rendering Markdown */}
        <Box
          style={{
            fontSize: '16px',
            tabSize: 4,
            fontWeight: 'normal',
          }}
        >
          <style>
            {`
              p {
                margin-bottom: 0;
                padding: 0;
              }
              li:first-of-type > p:first-of-type {
                margin-top: -16px;
              }
              ol {
                padding-left: 16px;
              }
              
            `}
          </style>
          <ReactMarkdown>{escapeBackslashes(content)}</ReactMarkdown>
        </Box>
      </Box>
    </Box>
  )
}
