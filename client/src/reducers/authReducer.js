import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_CHECK_FIELD_VALID,
  LOGIN_REMOVE_FIELD_ERRORS,
  LOGIN_REMOVE_ALL_FIELDS_ERRORS,
  SET_CURRENT_USER
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  errors: {},
  user: {},
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        errors: {},
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errors: {},
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.errors,
      }
    case LOGIN_CHECK_FIELD_VALID:
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          ...action.fieldError,
        },
      }
    case LOGIN_REMOVE_FIELD_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          ...action.emptyFieldError,
        },
      }
    case LOGIN_REMOVE_ALL_FIELDS_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: {},
      }
    case SET_CURRENT_USER:
      return {
        isLoading: false,
        errors: {},
        user: action.user
      }
    default:
      return state
  }
}

export default authReducer