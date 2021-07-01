import React, { useContext } from 'react'
import CardBoard from '../components/CardBoard'
import { AppContext } from '../state/AppContext'
import PropTypes from 'prop-types'

const initialForm = {
  appName: 'trident',
  componentName: 'trident-demo',
  version: '1.4.2.3'
}

const CardBoardContainer = ({ history }) => {
  const { state, setState, setError } = useContext(AppContext)
  const submitForm = async (form) => {
    const { appName, componentName, version } = form
    if (appName && componentName && version) {
      await setState({ ...state, loading: true, error: false })
      history.push(`/app/golive/${appName}/${componentName}/${version}`)
    } else {
      await setError('Your are missing some input values')
      history.push('/error')
    }
  }
  return <CardBoard initialForm={initialForm} submitForm={submitForm} />
}

CardBoardContainer.propTypes = {
  history: PropTypes.object
}

export default CardBoardContainer
