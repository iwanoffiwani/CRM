import { 
  REQUIRE_ORDER_LIST, 
  ADD_ORDER_LIST, 
  FAILED_ORDER_LIST,
  UPDATE_ORDER_LIST
} from '../actions'

const initialState = {
  payload: []
}

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUIRE_ORDER_LIST:
      return {
        ...state
      }
    case ADD_ORDER_LIST:
      return {
        ...state,
        payload: action.payload
      }
    case FAILED_ORDER_LIST:
      return {
        ...state,
        payload: action.payload
      }
    case UPDATE_ORDER_LIST:
      return {
        ...state,
        payload: action.payload
      }
    default: 
      return state
  }
}

export default ordersReducer