import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import useAppState from './useAppState'

export const initialData = {
  loading: true,
  loadingMsg: 'Loading...',
  error: false,
  errorMsg: '',
  report: null
}

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { state, setState, setValue, setError, setReport } = useAppState(initialData)

  return (
    <AppContext.Provider value={{ state, setState, setError, setReport, setValue }}>
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
