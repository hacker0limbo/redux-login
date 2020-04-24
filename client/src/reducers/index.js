import { combineReducers } from 'redux'
import signupReducer from './signupReducer'
import flashMessageReducer from './flashMessageReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  signupInfo: signupReducer,
  flashMessages: flashMessageReducer,
  authInfo: authReducer,
})

export default rootReducer