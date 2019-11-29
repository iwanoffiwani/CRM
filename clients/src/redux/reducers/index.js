import { combineReducers } from 'redux'
import authReducer from './authReducer'
import fieldsReducer from './fieldsReducer'
import statusesReducer from './statusesReducer'
import ordersReducer from './ordersReducer'
import searchReducer from './searchReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  fields: fieldsReducer,
  status: statusesReducer,
  orders: ordersReducer,
  search: searchReducer
})