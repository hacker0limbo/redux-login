import axios from 'axios'
import { addAndDeleteFlashMessage } from './flashMessageActions'
import history from '../history'
import { setAuthorizationToken } from '../services/auth'
import { setCurrentUser } from './authActions'

export const logoutRequest = (currentUser) => {
  return dispatch => {
    return axios.post('api/logout', currentUser)
      .then(res => {
        localStorage.removeItem('jwtToken')
        // 清空 axios header
        setAuthorizationToken(null)
        // state 清空
        dispatch(setCurrentUser({}))
        // 增加登出成功的 flash message
        dispatch(addAndDeleteFlashMessage(res.data.message))
        // 跳转到主页
        history.push('/login')
      }).catch(error => {
        // 登出失败信息
        dispatch(addAndDeleteFlashMessage(error.response.data.message))
        // 跳转到主页
        history.push('/')
      })
  }
}