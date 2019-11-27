import {
  REQUIRE_ORDER_FIELDS,
  ADD_ORDER_FIELDS, 
  FAILED_ORDER_FIELDS
} from '../actions'

const initialState = {
  payload: []
}

const fieldsReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUIRE_ORDER_FIELDS:
      return {
        ...state
      }
    case ADD_ORDER_FIELDS:
      return {
        ...state,
        payload: action.payload
      }
    case FAILED_ORDER_FIELDS:
      return {
        ...state,
        payload: action.payload
      }
    default: 
      return state
  }
}

export default fieldsReducer