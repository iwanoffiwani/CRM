import axios from "axios";
import {
  LOGIN_CURRENT_USER,
  UPDATE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  FAILED_CURRENT_USER
} from "../actions";
import { fetchFields, fetchStatuses, fetchOrderList } from "../actions";

export const localStorageMiddleware = store => next => action => {
  if (
    action.type === LOGIN_CURRENT_USER ||
    action.type === UPDATE_CURRENT_USER
  ) {
    localStorage.setItem("jwtToken", action.payload.token);
    axios.defaults.headers.common["Authorization"] = action.payload.token;
  } else if (
    action.type === LOGOUT_CURRENT_USER ||
    action.type === FAILED_CURRENT_USER
  ) {
    localStorage.removeItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = null;
  }

  return next(action);
};

export const fetchOrderFieldsMiddleware = store => next => action => {
  if (
    action.type === LOGIN_CURRENT_USER ||
    action.type === UPDATE_CURRENT_USER
  ) {
    store.dispatch(fetchFields());
  }

  return next(action);
};

export const fetchOrderStatusesMiddleware = store => next => action => {
  if (
    action.type === LOGIN_CURRENT_USER ||
    action.type === UPDATE_CURRENT_USER
  ) {
    store.dispatch(fetchStatuses());
  }

  return next(action);
};

export const fetchOrderListMiddleware = store => next => action => {
  if (
    action.type === LOGIN_CURRENT_USER ||
    action.type === UPDATE_CURRENT_USER
  ) {
    store.dispatch(fetchOrderList());
  }

  return next(action);
};
