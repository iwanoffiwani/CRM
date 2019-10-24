import { SET_CURRENT_USER } from '../actions'

const initialState = { user: false }

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    default: 
      return state
  }
}