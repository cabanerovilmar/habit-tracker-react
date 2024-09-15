import { Fragment } from 'react'
import { Box, Typography } from '@mui/material'

function App() {
  return (
    <Fragment>
      <CenteredMessage />
    </Fragment>
  )
}

export default App

function CenteredMessage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Set height to full viewport to ensure vertical centering
        textAlign: 'center', // Center text inside the Box,
        padding: 2,
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontSize: { xs: '24px', md: '36px' }, // Responsive font size: 24px on mobile, 36px on desktop
        }}
      >
        This website is under development.
      </Typography>
    </Box>
  )
}
