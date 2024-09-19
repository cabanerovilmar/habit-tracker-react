import { useEffect, useState } from 'react'

/**
 * Returns the user's preferred color scheme, either 'light' or 'dark'.
 *
 * Listens to the 'prefers-color-scheme' media query and updates the state
 * when the user's preferred color scheme changes.
 *
 * @returns The user's preferred color scheme, either 'light' or 'dark'.
 */
export const useSystemTheme = () => {
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const [prefersDark, setPrefersDark] = useState(query.matches)

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => setPrefersDark(e.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [query])

  return prefersDark ? 'dark' : 'light'
}
