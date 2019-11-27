import axios from 'axios'

import {
  requireCurrentUser,
  loginCurrentUser,
  updateCurrentUser,
  failedCurrentUser
} from './user'

import {
  requireOrderFields,
  addOrderFields,
  failedOrderFields
} from './fields'

import {
  requireOrderStatuses,
  addOrderStatuses,
  failedOrderStatuses
} from './statuses'

import {
  requireOrderList,
  addOrderList,
  failedOrderList,
  updateOrderList
} from './orders'

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

export const fetchFields = () => dispatch => {
  dispatch(requireOrderFields())

  return axios.get('/api/fields')
    .then(res => dispatch(addOrderFields(res.data)))
      .catch(err => dispatch(failedOrderFields(err.response)))
}

export const fetchStatuses = () => dispatch => {
  dispatch(requireOrderStatuses())

  return axios.get('/api/statuses')
    .then(res => dispatch(addOrderStatuses(res.data)))
      .catch(err => dispatch(failedOrderStatuses(err.response)))
}

export const fetchOrderList = () => dispatch => {
  dispatch(requireOrderList())

  return axios.get('/api/orders')
    .then(res => dispatch(addOrderList(res.data)))
      .catch(err => dispatch(failedOrderList(err.response)))
}

export const fetchUpdateOrderList = () => dispatch => {
  dispatch(requireOrderList())

  return axios.get('/api/orders')
    .then(res => dispatch(updateOrderList(res.data)))
      .catch(err => dispatch(failedOrderList(err.reponse)))
}