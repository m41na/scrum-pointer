import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen, cleanup } from '@testing-library/react'
import ErrorPage from '../../components/ErrorPage'
import { routeWrapper } from '../../__mock__/mockWrapper'

describe('testing Error page', () => {
  const clearError = jest.fn()

  afterEach(() => {
    cleanup()
  })

  test('Should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(routeWrapper(<ErrorPage error={true} clearError={clearError} />, '/error'), div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('Should render expected default text', () => {
    const errorString = 'Error handling request'
    render(routeWrapper(<ErrorPage error={true} clearError={clearError} />, '/error'))
    expect(screen.getByTestId('on-error')).toHaveTextContent(errorString)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('Should render expected error text', () => {
    const errorString = 'things went wrong'
    render(routeWrapper(<ErrorPage error={true} errorMsg={errorString} clearError={clearError} />, '/error'))
    expect(screen.getByText(/things went wrong/i)).toBeInTheDocument()
    expect(screen.getByTestId('on-error')).toHaveTextContent(errorString)
  })
})
