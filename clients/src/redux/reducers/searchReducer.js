import { SEARCH_ORDER } from '../actions'

const initialState = {
  payload: []
}

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_ORDER:
      return {
        ...state,
        payload: action.payload
      }
    default: 
      return state
  }
}

export default searchReducer