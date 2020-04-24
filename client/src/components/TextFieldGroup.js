import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TextFieldGroup = props => {
  const { 
    field, 
    value, 
    label, 
    type, 
    placeholder, 
    error, 
    handleInputChange, 
    handleInputBlur,
    handleInputFocus,
  } = props

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        name={field}
        type={type}
        className={classNames('form-control', { 'is-invalid': error })}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleInputBlur: PropTypes.func,
  handleInputFocus: PropTypes.func,
}

TextFieldGroup.defaultProps = {
  type: 'text',
  value: ''
}

export default TextFieldGroup