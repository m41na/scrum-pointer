import { act, renderHook } from '@testing-library/react-hooks'
import { useLocalStorage, useAppTheme } from '../../theme/AppTheme'

describe('setting value in local storage', () => {
  test('updateStorage should set value provided in local atorage', async () => {
    const { result } = renderHook(useLocalStorage)

    await act(async () => {
      result.current.updateStorage(true)
    })

    expect(result.current.light).toBe(true)

    await act(async () => {
      result.current.updateStorage(false)
    })

    expect(result.current.light).toBe(false)
  })
})

describe('setting value for the theme', () => {
  test('toggleMode should flip existing mode value', async () => {
    const { result } = renderHook(useAppTheme)

    await act(async () => {
      result.current.toggleMode()
    })

    expect(result.current.mode).toBe(true)

    await act(async () => {
      result.current.toggleMode()
    })

    expect(result.current.mode).toBe(false)
  })
})
