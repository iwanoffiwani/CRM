export const GET_ERROR = 'GET_ERROR'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

export function errorHandler(payload) {
  return {
    type: GET_ERROR,
    payload
  }
}

export function userLogin(payload) {
  return {
    type: USER_LOGIN,
    payload
  } 
}

export function userLogout(payload) {
  return {
    type: USER_LOGOUT,
    payload
  }
}