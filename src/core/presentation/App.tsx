// import { useState } from 'react'
import { AppViewModel } from './AppViewModel'
import { Button } from '@mui/material'
import DarkModeToggle from './theme/DarkModeToggle'

export default function App() {
  // const [count, setCount] = useState(0)

  const vm = AppViewModel()

  return (
    <div
      style={{
        width: '40rem',
        margin: 'auto',
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <h1>Vite + React</h1>
      <Button onClick={() => {}} variant="contained">
        darkModeSetting is {vm.darkModeSetting}
      </Button>
      <DarkModeToggle />
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}
