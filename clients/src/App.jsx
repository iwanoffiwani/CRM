import React from 'react'
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import PageHome from './pages/Home'
import PageAuthorization from './pages/Login/'

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;

  if(decoded.exp < currentTime) {
    //window.location.href = '/login'
    history.push('/login')
  }
} 

const App = () => (
  <Router>
    <Switch>
      <Route exact component={PageHome} path='/' />
      <Route exact component={PageAuthorization} path='/login' />
    </Switch>
  </Router>  
)

export default App