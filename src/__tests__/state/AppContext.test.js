import React, { useMemo } from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { initialData, AppProvider } from '../../state/AppContext'
import mockState from '../../__mock__/mockState'

const mockContext = mockState(initialData)

const TestComponent = () => {
  const { state, setState, setValue, setError, setReport } = useMemo(() => mockContext, [mockContext.state])
  return (
        <div data-testid="test-component">
            <button data-testid="setState" onClick={() => setState({ ...state, event: 'setState clicked' })}>Set State</button>
            <button data-testid="setValue" onClick={() => setValue('event', 'setValue clicked')}>Set Value</button>
            <button data-testid="setError" onClick={() => setError('set Error clicked')}>Set Error</button>
            <button data-testid="setReport" onClick={() => setReport({ one: 'one', two: 'two' })}>Set Report</button>
            <p data-testid='display-event'>{state.event}</p>
            <p data-testid='display-error'>{state.errorMsg}</p>
            <p data-testid='display-report'>{state.report ? `${state.report.one} or ${state.report.two}` : 'empty'}</p>
        </div>
  )
}

describe('test behavior of app context component', () => {
  afterAll(() => {
    cleanup()
  })

  test('setSate should update state with event', async () => {
    const component = (
            <AppProvider>
                <TestComponent />
            </AppProvider>
    )

    render(component)

    const displayEvent = screen.getByTestId('display-event')
    expect(displayEvent).toBeInTheDocument()
  })
})
