import { GET_ERROR } from '../actions'

const initialState = {
  error: null
}

export default function errorReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ERROR:
      return Object.assign({}, state, {
        error: action.payload
      })
    default:
      return state
  }
}