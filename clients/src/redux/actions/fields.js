import {
  REQUIRE_ORDER_FIELDS,
  ADD_ORDER_FIELDS,
  FAILED_ORDER_FIELDS
} from "./types";

export const requireOrderFields = () => {
  return {
    type: REQUIRE_ORDER_FIELDS
  };
};

export const addOrderFields = payload => {
  return {
    type: ADD_ORDER_FIELDS,
    payload
  };
};

export const failedOrderFields = payload => {
  return {
    type: FAILED_ORDER_FIELDS,
    payload
  };
};
