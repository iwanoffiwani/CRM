import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCurrentUser } from './redux/actions'
import { history } from './utils/history'
import PrivateRoute from './components/PrivateRoute'
import Tasks from './components/Tasks'
import Login from './containers/Login'

class App extends Component {
  componentDidMount() {
    this.props.updateCurrentUser()
  }

  render() { 
    return (
      <Router hisory={history}>
        <Switch>
          <Route path='/auth' component={Login} />
          <PrivateRoute path='/' exact component={Tasks} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentUser: () => dispatch(updateCurrentUser())
  }
}

export default connect(null, mapDispatchToProps)(App)