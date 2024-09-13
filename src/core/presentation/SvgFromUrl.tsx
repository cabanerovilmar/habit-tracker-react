import { useTheme } from '@mui/material/styles'
import { useState, useEffect } from 'react'

type Props = {
  url: string
}

export function SvgFromUrl({ url }: Props) {
  const [svgContent, setSvgContent] = useState('')
  const [error, setError] = useState(false)
  const theme = useTheme()
  const fillColor = theme.palette.mode === 'dark' ? 'white' : 'black'

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const text = await response.text()
        setSvgContent(text)
      } catch (error) {
        console.error('Error fetching SVG:', error)
        setError(true)
      }
    }

    fetchSvg()
  }, [url])

  if (error) {
    return <div>Error loading SVG.</div>
  }

  // if (!svgContent) {
  //   return <div>Loading...</div>
  // }

  // Add a style element to dynamically apply styles
  const svgStyle = `
    .path-fill-black {
      fill: ${fillColor};
    }
  `

  return (
    <div>
      {/* Injecting styles */}
      <style>{svgStyle}</style>
      {/* Injecting SVG content */}
      <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}
