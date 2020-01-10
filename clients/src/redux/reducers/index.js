import { combineReducers } from 'redux'
import authReducer from './authReducer'
import fieldsReducer from './fieldsReducer'
import statusesReducer from './statusesReducer'
import ordersReducer from './ordersReducer'
import searchReducer from './searchReducer'

export const rootReducer = combineReducers({
  authorization: authReducer,
  fields: fieldsReducer,
  statuses: statusesReducer,
  orders: ordersReducer,
  search: searchReducer
})