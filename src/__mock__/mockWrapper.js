import React from 'react'
import { AppProvider } from '../state/AppContext'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()

export const routeWrapper = (target, location = '/') => {
  return (
    <Router location={location} history={history}>
      {target}
    </Router>
  )
}

export const containerWrapper = (container) => {
  return <AppProvider>{container}</AppProvider>
}
