import { GET_ERRORS } from '../actions/';

const initialState = { error: false }

export default function(state = initialState, action ) {
  switch(action.type) {
    case GET_ERRORS:
      return action.error
    default: 
      return state
  }
}