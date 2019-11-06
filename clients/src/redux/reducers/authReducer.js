import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/types'

const user = (state = {}, action) => {
  switch(action.type) {
    case ADD_CURRENT_USER:
      return Object.assign({}, state, { user: action.user })
    case REMOVE_CURRENT_USER:
      return delete state.user
    default:
      return state
  }
}

export default user