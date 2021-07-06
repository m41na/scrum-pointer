import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import useAppState from './useAppState'

export const initialData = {
  loading: true,
  loadingMsg: 'Loading...',
  error: false,
  errorMsg: '',
  users: [],
  teams: [],
  party: {
    team: null,
    participants: []
  }
}

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const appState = useAppState(initialData)

  return (
    <AppContext.Provider value={{ ...appState }}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ])
}
