import { SEARCH_ORDER } from '../actions'

const initialState = {
  payload: ''
}

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_ORDER:
      return {
        ...state
      }
    default: 
      return state
  }
}

export default searchReducer