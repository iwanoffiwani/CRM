import { SEARCH_ORDER } from "./types";

export const searchOrder = payload => {
  return {
    type: SEARCH_ORDER,
    payload
  };
};
