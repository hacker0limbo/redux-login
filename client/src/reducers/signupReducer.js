import {
  SIGNUP_PENDING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_CHECK_FIELD_VALID,
  SIGNUP_REMOVE_FIELD_ERRORS,
  SIGNUP_REMOVE_ALL_FIELDS_ERRORS
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  errors: {},
}

const signupReducer = (state=initialState, action) => {
  switch(action.type) {
    case SIGNUP_PENDING:
      return {
        isLoading: true,
        errors: {}
      }
    case SIGNUP_SUCCESS:
      return {
        isLoading: false,
        errors: {}
      }
    case SIGNUP_FAILURE:
      return {
        isLoading: false,
        errors: action.errors
      }
    case SIGNUP_CHECK_FIELD_VALID:
      return {
        isLoading: false,
        errors: {
          ...state.errors,
          ...action.fieldError,
        }
      }
    case SIGNUP_REMOVE_FIELD_ERRORS:
      return {
        isLoading: false,
        errors: {
          ...state.errors,
          ...action.emptyFieldError,
        },
      }
    case SIGNUP_REMOVE_ALL_FIELDS_ERRORS:
      return {
        isLoading: false,
        errors: {}
      }
    default:
      return state
  }
}

export default signupReducer