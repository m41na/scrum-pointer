import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Layout from './components/Layout'
import Landing from './components/Landing'
import Players from './components/Players'
import CardBoard from './components/CardBoard'

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/players">
            <Players />
          </Route>
          <Route path="/cardboard">
            <CardBoard />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
