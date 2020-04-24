import axios from 'axios'
import { isEmpty } from './utils'

export const setAuthorizationToken = (token) => {
  // 判断传入的 token, 如果是 {}, null 这种空类型, 删除 header 里的 auth 字段
  if (!isEmpty(token)) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
