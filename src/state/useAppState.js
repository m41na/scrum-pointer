import { useState } from 'react'

export default (initialData) => {
  const [state, setState] = useState(initialData)

  const setValue = (key, value) => {
    setState({ ...state, [key]: value })
  }

  const setError = (errorMsg) => {
    const error = typeof errorMsg === 'string' && errorMsg.trim().length > 0
    setState({ ...state, error, errorMsg })
  }

  const setReport = (report) => {
    setState({ ...state, report })
  }

  return { state, setState, setValue, setError, setReport }
}
