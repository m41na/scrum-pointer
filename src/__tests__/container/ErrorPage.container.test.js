import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import ErrorPage from '../../container/ErrorPage.container'
import { routeWrapper, containerWrapper } from '../../__mock__/mockWrapper'

jest.mock('../../components/ErrorPage', () => {
  return () => <div data-testid="on-error">Dummy Error Page</div>
})

describe('testing ErrorPage.container component', () => {
  const props = {
    history: {
      push: jest.fn()
    },
    errorMsg: 'living it up'
  }

  afterEach(() => {
    cleanup()
  })

  test('Should render expected default text', () => {
    const errorString = 'Dummy Error Page'
    render(routeWrapper(containerWrapper(<ErrorPage {...props} />, '/error')))
    expect(screen.getByTestId('on-error')).toHaveTextContent(errorString)
  })
})
