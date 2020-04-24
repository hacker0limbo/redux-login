import { 
  ADD_FLASH_MESSAGE, 
  DELETE_FLASH_MESSAGE 
} from '../constants/actionTypes'
import { uuid } from '../services/utils'

const flashMessageReducer = (state=[], action={}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: uuid(),
          type: action.message.type,
          text: action.message.text
        }
      ]
    case DELETE_FLASH_MESSAGE:
      return state.filter(flashMessage => flashMessage.id !== action.id)
    default:
      return state
  }
}

export default flashMessageReducer