/* --- ACTIONS BLOCK --- */
export const REQUIRE_CURRENT_USER = 'REQUIRE_CURRENT_USER'

export const requireCurrentUser = payload => {
  return {
    type: REQUIRE_CURRENT_USER,
    payload
  }
}

export const SUCCESS_CURRENT_USER = 'SUCCESS_CURRENT_USER'

export const successCurrentUser = payload => {
  return {
    type: SUCCESS_CURRENT_USER,
    payload
  }
}

export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

export const removeCurrentUser = payload => {
  return {
    type: REMOVE_CURRENT_USER,
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
  const jwtToken = localStorage.getItem('jwtToken')

  if (!jwtToken) return

  const jwtDecoded = require('jwt-decode')
  const decoded = jwtDecoded(jwtToken)

  const currentTime = Date.now() / 1000

  // Если время истекло, то с этим разберется privateRoute.
  // Здесь только обновляется состояние хранилища
  if (decoded.exp < currentTime) return

  return dispatch(successCurrentUser(decoded))
}

export const loginUser = (user, history) => dispatch => {    
  const axios = require('axios')

  dispatch(requireCurrentUser(user))

  axios.post('/api/auth/login', user)
    .then(res => {
      const { token } = res.data

      localStorage.setItem('jwtToken', token)
      const jwtDecoded = require('jwt-decode')
      const decoded = jwtDecoded(token)

      dispatch(successCurrentUser(decoded))
      
      return history.push('/')
    })
    .catch(err => {
      const { message } = err.response.data

      dispatch(failedCurrentUser({ error: true, message }))
      return localStorage.removeItem('jwtToken')
    })
}