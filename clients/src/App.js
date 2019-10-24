import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './redux/store'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './shared/setAuthToken'
import { userCreator } from './redux/actions/'
import history from './history/'
import Tasks from './components/Tasks'
import Login from './containers/Login'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)

  store.dispatch(userCreator(decoded))

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    window.location = '/login'
  }
}

class App extends Component {
  UNSAFE_componentWillMount() {
    if (!this.props.auth)
      return history.push('/login')
  }
  
  render() {
    return (
      <Router history={ history }>
        <Switch>
          <Route path='/' exact component={Tasks} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({ auth: state.auth.user })

export default connect(mapStateToProps)(App)