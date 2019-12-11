import { EDIT_DRAWER_OPEN, EDIT_DRAWER_CLOSE } from './types'

export const editDrawerOpen = payload => {
  return {
    type: EDIT_DRAWER_OPEN,
    payload
  }
}

export const editDrawerClose = () => {
  return {
    type: EDIT_DRAWER_CLOSE
  }
}