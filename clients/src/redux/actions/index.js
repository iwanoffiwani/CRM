/* --- ACTIONS BLOCK --- */
export const REQUIRE_CURRENT_USER = 'REQUIRE_CURRENT_USER'

export const requireCurrentUser = payload => {
  return {
    type: REQUIRE_CURRENT_USER,
    payload
  }
}

export const LOGIN_CURRENT_USER = 'LOGIN_CURRENT_USER'

export const loginCurrentUser = payload => {
  return {
    type: LOGIN_CURRENT_USER,
    payload
  }
}

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'

export const updateCurrentUser = payload => {
  return {
    type: UPDATE_CURRENT_USER,
    payload
  }
}

export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

export const logoutCurrentUser = payload => {
  return {
    type: LOGOUT_CURRENT_USER,
    payload
  }
}

export const FAILED_CURRENT_USER = 'FAILED_CURRENT_USER'

export const failedCurrentUser = payload => {
  return {
    type: FAILED_CURRENT_USER,
    payload
  }
}

/* --- THUNKS BLOCK --- */
export const updateUser = () => dispatch => {
  const token = localStorage.getItem('jwtToken')

  if (!token) return

  const jwtDecoded = require('jwt-decode')
  const decoded = jwtDecoded(token)

  const currentTime = Date.now() / 1000

  // Если время истекло, то с этим разберется privateRoute.
  // Здесь только обновляется состояние хранилища
  if (decoded.exp < currentTime) return

  return dispatch(updateCurrentUser({ user: decoded, token }))
}

export const loginUser = (user, history) => dispatch => {    
  const axios = require('axios')

  dispatch(requireCurrentUser(user))

  axios.post('/api/auth/login', user)
    .then(res => {
      const { token } = res.data

      const jwtDecoded = require('jwt-decode')
      const decoded = jwtDecoded(token)

      dispatch(loginCurrentUser({ user: decoded, token }))
      
      return history.push('/')
    })
    .catch(err => {
      const { message } = err.response.data

      dispatch(failedCurrentUser({ error: true, message }))
      return localStorage.removeItem('jwtToken')
    })
}