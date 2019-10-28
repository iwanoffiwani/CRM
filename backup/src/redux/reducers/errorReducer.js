import { GET_ERRORS } from '../actions/';

const initialState = { payload: false }

export default function(state = initialState, action ) {
  switch(action.type) {
    case GET_ERRORS:
      return Object.assign({}, state, {
        payload: action.payload
      })
    default: 
      return state
  }
}