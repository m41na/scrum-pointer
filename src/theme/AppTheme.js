import { useState, useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { purple, red } from '@material-ui/core/colors'

export const useLocalStorage = () => {
  const MODE_KEY = 'mode'

  const current = String(localStorage.getItem(MODE_KEY)) === 'true'

  const [light, setLight] = useState(current)

  const updateStorage = (mode) => {
    setLight(mode)
    localStorage.setItem(MODE_KEY, mode)
  }

  return { light, updateStorage }
}

export const useAppTheme = () => {
  const { light, updateStorage } = useLocalStorage()
  const [mode, setMode] = useState(light)

  const theme = useMemo(() =>
    createMuiTheme({
      palette: {
        primary: purple,
        secondary: red,
        palette: {
          type: mode ? 'dark' : 'light'
        }
      }
    }), [mode])

  const toggleMode = () => {
    const next = !mode
    setMode(next)
    updateStorage(next)
  }

  return { theme, mode, toggleMode }
}
