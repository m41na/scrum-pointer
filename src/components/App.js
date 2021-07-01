import React from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route
} from 'react-router-dom'
import Layout from './Layout'
import Landing from '../container/Landing.container'
import Players from '../container/Players.container'
import CardBoard from '../container/CardBoard.container'
import ErrorPage from '../container/ErrorPage.container'

const App = ({ history, mode, toggleMode }) => (
  <Layout history={history} mode={mode} toggleMode={toggleMode}>
    <Switch>
      <Route path="/players">
        <Players />
      </Route>
      <Route path="/cardboard">
        <CardBoard />
      </Route>
      <Route exact path="/error" render={(props) => <ErrorPage {...props} />} />
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </Layout>
)

App.propTypes = {
  history: PropTypes.object,
  mode: PropTypes.bool,
  toggleMode: PropTypes.func
}

export default App
