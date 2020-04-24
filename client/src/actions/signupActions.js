import axios from 'axios'
import { addAndDeleteFlashMessage } from './flashMessageActions'
import history from '../history'
import {
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../constants/actionTypes'

// 注册触发的 action
export const signupPending = () => {
  return {
    type: SIGNUP_PENDING,
    // errors, isLoading 直接在 reducer 里面显示声明
  }
}

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  }
}

export const signupFailure = (errors) => {
  return {
    type: SIGNUP_FAILURE,
    errors
  }
}

export const signupRequest = (userData) => {
  return (dispatch, getState) => {
    dispatch(signupPending())

    return axios.post('/api/signup', userData)
      .then(res => {
        dispatch(signupSuccess())
        // flash message 的 action
        dispatch(addAndDeleteFlashMessage(res.data.message))
        // 跳转路由
        history.push('/login')

      })
      .catch(error => {
        dispatch(addAndDeleteFlashMessage(error.response.data.message))
        dispatch(signupFailure(error.response.data.errors))
      })
      // 路由跳转
  }
}
