import axios from 'axios'
import { addAndDeleteFlashMessage } from './flashMessageActions'
import history from '../history'
import jwtDecode from 'jwt-decode'
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/actionTypes'
import { setAuthorizationToken } from '../services/auth'
import { setCurrentUser } from './authActions'

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  }
}

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  }
}

export const loginFailure = (errors={}) => {
  // errors 使用默认 {}, 服务端可以选择不传入 errors
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const loginRequest = (userData) => {
  return dispatch => {
    dispatch(loginPending)

    return axios.post('api/login', userData)
      .then(res => {
        const token = res.data.token

        dispatch(loginSuccess())
        // 这里 token 就是 user,  decode 出来是一个对象
        dispatch(setCurrentUser(jwtDecode(token)))
        // 设置 localstorage
        localStorage.setItem('jwtToken', token);
        // 设置 axios header
        setAuthorizationToken(token)
        // 增加 flash message
        dispatch(addAndDeleteFlashMessage(res.data.message))
        // 跳转到主页
        history.push('/')
      })
      .catch(error => {
        dispatch(addAndDeleteFlashMessage(error.response.data.message))
        dispatch(loginFailure(error.response.data.errors))
      })
  }
}