import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from './redux/actions'
import { history } from './utils/history'
import PrivateRoute from './components/PrivateRoute'
import Login from './containers/Login'
import Table from './containers/Table/'

// const styles = theme => ({
//   '@global': {
//     '*::-webkit-scrollbar': {
//       width: '0.4em'
//     },
//     '*::-webkit-scrollbar-track': {
//       '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
//     },
//     '*::-webkit-scrollbar-thumb': {
//       backgroundColor: 'rgba(0,0,0,.1)',
//       outline: '1px solid slategrey'
//     }
//   }
// })

class App extends Component {
  UNSAFE_componentWillMount() {
    this.props.updateUser()
  }
  render() { 
    return (
      <Router hisory={history}>
        <Switch>
          <Route path='/auth' component={Login} />
          <PrivateRoute path='/' exact component={Table} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: () => dispatch(updateUser())
  }
}

export default connect(null, mapDispatchToProps)(App)