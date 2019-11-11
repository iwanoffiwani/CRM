import { combineReducers } from 'redux'
import { 
  REQUIRE_CURRENT_USER, SUCCESS_CURRENT_USER, 
  REMOVE_CURRENT_USER, FAILED_CURRENT_USER 
} from '../actions'

const authReducer = (state={ payload: {} }, action) => {
  switch(action.type) {
    case REQUIRE_CURRENT_USER:
      return {
        ...state,
        payload: action.payload
      }
    case SUCCESS_CURRENT_USER:
      return {
        ...state,
        payload: action.payload
      }
    case REMOVE_CURRENT_USER:
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