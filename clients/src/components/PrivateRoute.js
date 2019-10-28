import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../shared/setAuthToken'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={routeProps => {
      const currentUser = localStorage.getItem('jwtToken')
      const location = routeProps.location.pathname

      if (!currentUser) 
        return <Redirect
          to={{
            pathname: '/login',
            from: location
          }}
        />
      
      setAuthToken(currentUser)

      const decoded = jwt_decode
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime)
        return <Redirect
          to={{
            pathname: '/login'
          }}
        />

      return <Component {...routeProps} />
    }} />
  )
}

export default PrivateRoute