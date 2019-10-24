export const GET_ERRORS = 'GET_ERRORS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const userCreator = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const errorCreator = (error) => {
  return {
    type: GET_ERRORS,
    error
  }
}