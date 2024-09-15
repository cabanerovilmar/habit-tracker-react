import { createTheme } from '@mui/material/styles'

export function createMuiTheme(isDarkMode: boolean) {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#212121' : '#ffffff', // App background
      },
      text: {
        primary: isDarkMode ? '#ececec' : '#0d0d0d', // Default text color
      },
    },
    typography: {
      fontFamily: '-apple-system, system-ui, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
      allVariants: {
        color: isDarkMode ? '#ececec' : '#0d0d0d', // Set default text color for all typography variants
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {},
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
    },
  })
}
