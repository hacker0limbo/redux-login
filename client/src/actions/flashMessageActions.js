import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE
} from '../constants/actionTypes'

export const addFlashMessage = message => {
  // 这里 message 是一个对象 { type: 'success', text: 'xxx' }
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export const deleteFlashMessage = id => {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  }
}

export const addAndDeleteFlashMessage = (message) => {
  // thunk 不仅仅可以处理异步 acion, 同步 action 需要做条件判断也可以使用
  return (dispatch, getState) => {
    dispatch(addFlashMessage(message))
    const messages = getState().flashMessages
    const latestMessage = messages[messages.length - 1]
    if (latestMessage) {
      // 10 秒后删除 flash message
      setTimeout(() => {
        dispatch(deleteFlashMessage(latestMessage.id))
      }, 10000)
    }
  }
}