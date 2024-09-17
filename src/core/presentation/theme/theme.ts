import { createTheme, MantineColorsTuple } from '@mantine/core'

// Custom primary color palette for the theme color of #339af0, generated using Mantine's color generator tool
// Source: https://mantine.dev/colors-generator/?color=339af0
// The colors array represents different shades of the primary blue color,
// ranging from light (#e2f8ff) to dark (#005dac).
const primaryColor: MantineColorsTuple = [
  '#e2f8ff',
  '#ceeaff',
  '#9fd1fb',
  '#6db8f5',
  '#43a2f1',
  '#2894ef',
  '#118eef',
  '#007ad6',
  '#006dc1',
  '#005dac',
]

// Create a custom theme using the primary color palette defined above
export const theme = createTheme({
  fontFamily: '-apple-system, system-ui, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
  colors: {
    'primary-blue': primaryColor, // Use the custom blue shades as the primary color
  },
  primaryColor: 'primary-blue',
})
