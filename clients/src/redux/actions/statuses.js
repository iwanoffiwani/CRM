import {
  REQUIRE_ORDER_STATUSES,
  ADD_ORDER_STATUSES,
  FAILED_ORDER_STATUSES
} from "./types";

export const requireOrderStatuses = () => {
  return {
    type: REQUIRE_ORDER_STATUSES
  };
};

export const addOrderStatuses = payload => {
  return {
    type: ADD_ORDER_STATUSES,
    payload
  };
};

export const failedOrderStatuses = payload => {
  return {
    type: FAILED_ORDER_STATUSES,
    payload
  };
};
