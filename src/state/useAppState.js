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

  const setParty = (party) => {
    setState({ ...state, party })
  }

  const updateUsers = (user) => {
    setState({ ...state, users: [...state.users, ...user] })
  }

  const updateTeams = (team) => {
    setState({ ...state, teams: [...state.teams, ...team] })
  }

  return { state, setState, setValue, setError, setParty, updateUsers, updateTeams }
}
