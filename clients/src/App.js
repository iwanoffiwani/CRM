import React, { Component } from 'react'
import store from './redux/store/'
import { addUser } from './redux/actions/'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PrivateRoute from './components/PrivateRoute'
import Tasks from './components/Tasks'
import Auth from './containers/Auth'

const jwtToken = localStorage.getItem('jwtToken')

if (jwtToken) store.dispatch(addUser(jwt_decode(jwtToken)))

class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path='/auth' component={Auth} />
          <PrivateRoute path='/' exact component={Tasks} />
        </Switch>
      </Router>
    )
  }
}

export default App