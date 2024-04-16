import React from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import useThemeStore from '@/core/presentation/store'

const DarkModeToggle = () => {
  const { darkModeSetting, setDarkMode } = useThemeStore(state => ({
    darkModeSetting: state.darkModeSetting,
    setDarkMode: state.setDarkMode,
  }))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value) {
      case 'on':
        setDarkMode('on')
        break
      case 'off':
        setDarkMode('off')
        break
      case 'system':
        setDarkMode('system')
        break
      default:
        break
    }
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Dark Mode Setting: {darkModeSetting}</FormLabel>
      <RadioGroup row={false} value={darkModeSetting} onChange={handleChange}>
        <FormControlLabel value="off" control={<Radio />} label="Off" />
        <FormControlLabel value="on" control={<Radio />} label="On" />
        <FormControlLabel value="system" control={<Radio />} label="System" />
      </RadioGroup>
    </FormControl>
  )
}

export default DarkModeToggle
