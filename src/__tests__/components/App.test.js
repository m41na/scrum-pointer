import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import App from '../../components/App'

jest.mock('../../container/ErrorPage.container', () => () => <div data-testid="on-error"></div>)
jest.mock('../../container/CardBoard.container', () => () => <div data-testid="cards"></div>)
jest.mock('../../container/Players.container', () => () => <div data-testid="players"></div>)
jest.mock('../../container/Landing.container', () => () => <div data-testid="landing"></div>)

const appComponent = () => {
  return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
  )
}

describe('test rendering App page', () => {
  test('Should render Landing page which is the default view', () => {
    const { getByTestId } = render(appComponent())
    expect(getByTestId('landing')).toBeInTheDocument()
  })
})
