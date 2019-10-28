import React, { Component } from 'react'
import store from './redux/store/'
import { userLogin } from './redux/actions/'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PrivateRoute from './components/PrivateRoute'
import Tasks from './components/Tasks'
import Login from './containers/Login'

const history = createBrowserHistory();

const jwtToken = localStorage.getItem('jwtToken')

if (jwtToken) store.dispatch(userLogin(jwt_decode(jwtToken)))

class App extends Component {
  render() {
    return (
      <Router history={ history }>
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute path='/' exact component={Tasks} />
        </Switch>
      </Router>
    )
  }
}

export default App