import React, { useContext } from 'react'
import ErrorPage from '../components/ErrorPage'
import { AppContext } from '../state/AppContext'
import PropTypes from 'prop-types'

const ErrorPageContainer = ({ history }) => {
  const { state, setState } = useContext(AppContext)
  const { error, errorMsg } = state

  const clearError = async () => {
    await setState({ ...state, error: false, errorMsg: '' })
  }

  return <ErrorPage history={history} error={error} errorMsg={errorMsg} clearError={clearError} />
}

ErrorPageContainer.propTypes = {
  history: PropTypes.object
}

export default ErrorPageContainer
