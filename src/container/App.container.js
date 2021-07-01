import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import App from '../components/App'
import { AppProvider } from '../state/AppContext'
import { useAppTheme } from '../theme/AppTheme'
import { useHistory } from 'react-router-dom'

const AppContainer = () => {
  const { theme, mode, toggleMode } = useAppTheme()
  const history = useHistory()

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <App history={history} mode={mode} toggleMode={toggleMode} />
      </AppProvider>
    </ThemeProvider>
  )
}

export default AppContainer
