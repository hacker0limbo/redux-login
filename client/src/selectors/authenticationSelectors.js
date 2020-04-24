import { createSelector } from 'reselect'
import { isEmpty } from '../services/utils'

export const userSelector = state => state.authInfo.user

export const authSelector = createSelector(
  userSelector,
  user => !isEmpty(user)
)