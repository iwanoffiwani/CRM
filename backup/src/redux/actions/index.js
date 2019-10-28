export const GET_ERRORS = 'GET_ERRORS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const userCreator = (payload) => {
  return {
    type: SET_CURRENT_USER,
    payload
  }
}

export const errorCreator = (payload) => {
  return {
    type: GET_ERRORS,
    payload
  }
}