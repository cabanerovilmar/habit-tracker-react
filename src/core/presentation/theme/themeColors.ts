// Define the type for the theme mode
type ThemeMode = 'dark' | 'light'

// Define color constants based on theme mode
export const getTextboxBackground = (mode: ThemeMode): string => (mode === 'dark' ? '#2f2f2f' : '#f4f4f4')

export const getTextboxText = (mode: ThemeMode): string => (mode === 'dark' ? '#ececec' : '#0d0d0d')
