import { useMantineColorScheme } from '@mantine/core'
import { useEffect } from 'react'

/**
 * Updates the theme color of a PWA by setting the content attribute of a
 * `<meta name="theme-color" />` tag. The color is determined by the Mantine
 * color scheme.
 *
 * @example
 * import { useUpdatePwaThemeColor } from './useUpdatePwaThemeColor'
 *
 * function App() {
 *   useUpdatePwaThemeColor()
 *
 *   return <div>My app</div>
 * }
 */
export function useUpdatePwaThemeColor() {
  const { colorScheme } = useMantineColorScheme()
  const background = colorScheme === 'dark' ? '#212121' : '#ffffff'

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', background)
    }
  }, [background, colorScheme])
}
