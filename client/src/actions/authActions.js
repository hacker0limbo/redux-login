import { SET_CURRENT_USER } from '../constants/actionTypes'

export const setCurrentUser = (user={}) => {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}
