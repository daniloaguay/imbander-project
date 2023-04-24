import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../styles/theme'
import { GlobalStyles } from '../styles/global'

const Toggle = () => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <button onClick={toggleTheme}>Switch Theme</button>
  )
}

export default Toggle