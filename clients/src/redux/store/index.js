import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { rootReducer } from '../reducers'

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return compose(applyMiddleware(thunk))
  } else {
    return compose(applyMiddleware(thunk, logger))
  }
}

export const store = createStore(rootReducer, getMiddleware())