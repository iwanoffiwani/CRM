import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from './types'

export const addUser = user => {
  return {
    type: ADD_CURRENT_USER,
    user
  }
}

export const removeUser = id => {
  return {
    type: REMOVE_CURRENT_USER,
    id
  }
}