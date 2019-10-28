import { SET_CURRENT_USER } from '../actions'

const initialState = { payload: false }

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        payload: action.payload
      })
    default: 
      return state
  }
}