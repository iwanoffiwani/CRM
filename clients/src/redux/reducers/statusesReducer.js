import {
  REQUIRE_ORDER_STATUSES, 
  ADD_ORDER_STATUSES, 
  FAILED_ORDER_STATUSES
} from '../actions'

const initialState = {
  payload: []
}

const statusesReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUIRE_ORDER_STATUSES:
      return {
        ...state
      }
    case ADD_ORDER_STATUSES:
      return {
        ...state,
        payload: action.payload
      }
    case FAILED_ORDER_STATUSES:
      return {
        ...state,
        payload: action.payload
      }
    default: 
      return state
  }
}

export default statusesReducer