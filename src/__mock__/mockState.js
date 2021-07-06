export default (initialState) => {
  let state = {
    ...initialState
  }

  const setState = (value) => {
    state = { ...state, ...value }
  }

  const setValue = (key, value) => {
    state = { ...state, [key]: value }
  }

  const setError = (message) => {
    state = { ...state, error: true, errorMsg: message }
  }

  const setParty = (report) => {
    state = { ...state, report }
  }

  return { state, setState, setValue, setError, setParty }
}
