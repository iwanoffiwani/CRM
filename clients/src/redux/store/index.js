import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "../reducers";
import {
  localStorageMiddleware,
  fetchOrderFieldsMiddleware,
  fetchOrderStatusesMiddleware,
  fetchOrderListMiddleware
} from "../middleware";

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return compose(
      applyMiddleware(
        localStorageMiddleware,
        fetchOrderFieldsMiddleware,
        fetchOrderStatusesMiddleware,
        fetchOrderListMiddleware,
        thunk
      )
    );
  } else {
    return compose(
      applyMiddleware(
        localStorageMiddleware,
        fetchOrderFieldsMiddleware,
        fetchOrderStatusesMiddleware,
        fetchOrderListMiddleware,
        thunk,
        logger
      )
    );
  }
};

export const store = createStore(rootReducer, getMiddleware());
