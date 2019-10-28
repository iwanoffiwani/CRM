import { USER_LOGIN, USER_LOGOUT } from '../actions/'

const initialState = {}

export default function loginUser(state = initialState, action) {
  switch(action.type) {
    case USER_LOGIN: 
      return Object.assign({}, state, {
        user: action.payload
      })
    case USER_LOGOUT:
      return Object.assign({}, state, {
        user: action.payload
      })
    default: 
      return state
  }
}