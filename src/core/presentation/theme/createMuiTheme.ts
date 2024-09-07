import { createTheme } from '@mui/material/styles'

export function createMuiTheme(isDarkMode: boolean) {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#212121' : '#ffffff', // App background
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2f2f2f' : '#f4f4f4', // Textbox background
            color: isDarkMode ? '#ececec' : '#0d0d0d', // Text color inside the textbox
          },
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
