import { combineReducers } from 'redux'
import { 
  REQUIRE_CURRENT_USER, LOGIN_CURRENT_USER, 
  UPDATE_CURRENT_USER, LOGOUT_CURRENT_USER, 
  FAILED_CURRENT_USER
} from '../actions'

const authReducer = (state={ payload: {} }, action) => {
  switch(action.type) {
    case REQUIRE_CURRENT_USER:
      return {
        ...state,
        payload: action.payload
      }
    case LOGIN_CURRENT_USER:
      return {
        ...state,
        payload: action.payload
      }
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        payload: action.payload
      }
    case LOGOUT_CURRENT_USER:
      return {
        ...state,
        payload: action.payload
      }
    case FAILED_CURRENT_USER:
      return {
        ...state,
        payload: action.payload
      }
    default: 
      return state
  }
}

export const rootReducer = combineReducers({
  auth: authReducer
})