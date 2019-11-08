import { combineReducers } from 'redux'
import { SET_CURRENT_USER, REMOVE_CURRENT_USER, GET_ERROR } from '../actions'

const authReducer = (state={ user: {} }, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user
      }
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        user: {}
      }
    default: 
      return state
  }
}

const errorReducer = (state={ 
  didInvalidate: false, 
  message: '' }, 
  action) => {
  switch(action.type) {
    case GET_ERROR:
      return {
        ...state,
        didInvalidate: action.didInvalidate,
        message: action.message
      }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer
})