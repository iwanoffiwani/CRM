import {
  REQUIRE_CURRENT_USER,
  LOGIN_CURRENT_USER,
  UPDATE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  FAILED_CURRENT_USER
} from './types'

export const requireCurrentUser = payload => {
  return {
    type: REQUIRE_CURRENT_USER,
    payload
  }
}

export const loginCurrentUser = payload => {
  return {
    type: LOGIN_CURRENT_USER,
    payload
  }
}

export const updateCurrentUser = payload => {
  return {
    type: UPDATE_CURRENT_USER,
    payload
  }
}

export const logoutCurrentUser = payload => {
  return {
    type: LOGOUT_CURRENT_USER,
    payload
  }
}

export const failedCurrentUser = payload => {
  return {
    type: FAILED_CURRENT_USER,
    payload
  }
}