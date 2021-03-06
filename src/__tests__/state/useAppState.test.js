import { act, renderHook } from '@testing-library/react-hooks'
import { initialData } from '../../state/AppContext'
import useAppState from '../../state/useAppState'

describe('setting value inside state', () => {
  test('setValue should set [key/value] in the state', async () => {
    const { result } = renderHook(useAppState)
    const testValue = 'value is set'

    await act(async () => {
      result.current.setValue('test', testValue)
    })

    expect(result.current.state.test).toBe(testValue)
  })

  test('setState should update the state', async () => {
    const { result } = renderHook(useAppState)
    const updatedState = { ...initialData, error: true }

    await act(async () => {
      result.current.setState(updatedState)
    })

    expect(result.current.state.error).toBe(true)
  })

  test('setError should update the state', async () => {
    const { result } = renderHook(useAppState)

    await act(async () => {
      result.current.setError('we got issues')
    })

    expect(result.current.state.error).toBe(true)
    expect(result.current.state.errorMsg).toBe('we got issues')
  })

  test('setParty should update the state', async () => {
    const { result } = renderHook(useAppState)

    await act(async () => {
      result.current.setParty({
        team: 'one',
        participant: ['steve']
      })
    })

    expect(result.current.state.party).toMatchObject({
      team: 'one',
      participant: ['steve']
    })
  })

  test('updateUsers should update the state', async () => {
    const { result } = renderHook(useAppState)

    await act(async () => {
      result.current.setState(initialData)
    })

    await act(async () => {
      result.current.updateUsers(['one', 'two'])
    })

    expect(result.current.state.users).toMatchObject(['one', 'two'])
  })

  test('updateTeams should update the state', async () => {
    const { result } = renderHook(useAppState)

    await act(async () => {
      result.current.setState(initialData)
    })

    await act(async () => {
      result.current.updateTeams(['teamA', 'teamB'])
    })

    expect(result.current.state.teams).toMatchObject(['teamA', 'teamB'])
  })
})
