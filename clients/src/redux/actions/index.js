export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  }
}

export const GET_ERROR = 'GET_ERROR'

export const errorHandler = (didInvalidate, message) => {
  return {
    type: GET_ERROR,
    didInvalidate,
    message
  }
}

export const updateCurrentUser = () => dispatch => {
  const jwtToken = localStorage.getItem('jwtToken')

  if (!jwtToken) return

  const jwtDecoded = require('jwt-decode')
  const decoded = jwtDecoded(jwtToken)

  const currentTime = Date.now() / 1000

  // Если время жизни все, то с этим разберется privateRoute.
  // Здесь только обновляется состояние хранилища
  if (decoded.exp < currentTime) return

  return dispatch(setCurrentUser(decoded))
}

export const loginUser = (user, history) => dispatch => {    
  const axios = require('axios')

  axios.post('/api/auth/login', user)
    .then(res => {
      const { token } = res.data

      localStorage.setItem('jwtToken', token)
      const jwtDecoded = require('jwt-decode')
      const decoded = jwtDecoded(token)

      dispatch(setCurrentUser(decoded))
      return history.push('/')
    })
    .catch(err => {
      const { message } = err.response.data

      dispatch(errorHandler(true, message))
      return localStorage.removeItem('jwtToken')
    })
}