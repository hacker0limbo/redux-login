import { 
  CHECK_FIELD_VALID,
  REMOVE_FIELD_ERRORS,
  REMOVE_ALL_FIELDS_ERRORS,
} from '../../constants/actionTypes'

export const withCheckFieldValid = (name, otherPayloads={}) => {
  return (field, errorMessage) => {
    // errorMessage 可以为空, 表示没有错误
    return {
      type: `${name}_${CHECK_FIELD_VALID}`,
      fieldError: {
        [field]: errorMessage
      },
      ...otherPayloads,
    }
  }
}

export const withRemoveFieldErrors = (name, otherPayloads={}) => {
  // 用户 onFocus 时取消该 field 下的所有 error message
  return field => {
    return {
      type: `${name}_${REMOVE_FIELD_ERRORS}`,
      emptyFieldError: {
        [field]: ''
      },
      ...otherPayloads,
    }
  }
}

export const withRemoveAllFieldsErrors = (name, otherPayloads={}) => {
  // 清除所有 fields 下的所有 errors
  return () => {
    return {
      type: `${name}_${REMOVE_ALL_FIELDS_ERRORS}`,
      ...otherPayloads,
    }
  }
}
