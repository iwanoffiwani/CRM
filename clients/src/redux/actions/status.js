export const changeStatusRequire = payload => {
  return {
    type: CHANGE_STATUS_REQUIRE,
    payload
  }
}

export const changeStatusSuccess = payload => {
  return {
    type: CHANGE_STATUS_SUCCESS,
    payload
  }
}

export const changeStatusError = payload => {
  return {
    type: CHANGE_STATUS_ERROR,
    payload
  }
}