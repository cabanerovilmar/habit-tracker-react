import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { useSystemTheme } from '@/core/hooks/useSystemTheme'

type Props = {
  children: React.ReactNode
}

/**
 * Provides Mantine theme to the application.
 *
 * The theme color is generated using Mantine's color generator tool:
 * https://mantine.dev/colors-generator/?color=339af0
 *
 * The default color scheme is determined by the user's system preferences.
 *
 * @example
 * import { AppThemeProvider } from '@entalpiya/core/presentation/theme'
 *
 * function App() {
 *   return (
 *     <AppThemeProvider>
 *       <MyApp />
 *     </AppThemeProvider>
 *   )
 * }
 */
export function AppThemeProvider(props: Props) {
  const { children } = props
  const systemColorScheme = useSystemTheme()

  return (
    <MantineProvider theme={theme} defaultColorScheme={systemColorScheme}>
      {children}
    </MantineProvider>
  )
}
