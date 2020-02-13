import {
  REQUIRE_CREATE_ORDER,
  ADD_CREATE_ORDER,
  FAILED_CREATE_ORDER,
  REQUIRE_ORDER_LIST,
  ADD_ORDER_LIST,
  FAILED_ORDER_LIST,
  UPDATE_ORDER_LIST
} from "./types";

export const requireCreateOrder = () => {
  return {
    type: REQUIRE_CREATE_ORDER
  };
};

export const addCreateOrder = payload => {
  return {
    type: ADD_CREATE_ORDER,
    payload
  };
};

export const failedCreateOrder = payload => {
  return {
    type: FAILED_CREATE_ORDER,
    payload
  };
};

export const requireOrderList = () => {
  return {
    type: REQUIRE_ORDER_LIST
  };
};

export const addOrderList = payload => {
  return {
    type: ADD_ORDER_LIST,
    payload
  };
};

export const failedOrderList = payload => {
  return {
    type: FAILED_ORDER_LIST,
    payload
  };
};

export const updateOrderList = payload => {
  return {
    type: UPDATE_ORDER_LIST,
    payload
  };
};
