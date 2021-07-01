import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import App from '../../container/App.container'
import { BrowserRouter } from 'react-router-dom'

const appContainer = () => {
  return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
  )
}

describe('testing App.container component', () => {
  test('Should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(appContainer(), div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('Should render Landing page which is the default view', () => {
    const { getByTestId } = render(appContainer())
    expect(getByTestId('landing')).toBeInTheDocument()
  })
})
