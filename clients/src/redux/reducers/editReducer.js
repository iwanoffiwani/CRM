import { 
  EDIT_DRAWER_OPEN, 
  EDIT_DRAWER_CLOSE
} from '../actions'

const initialState = {
  payload: {
    drawerOpen: false,
    order: null
  }
}

const editReducer = (state = initialState, action) => {
  switch(action.type) {
    case EDIT_DRAWER_OPEN:
      return {
        ...state,
        payload: action.payload
      }
    case EDIT_DRAWER_CLOSE:
      return {
        ...initialState
      }
    default: 
      return state
  }
}

export default editReducer