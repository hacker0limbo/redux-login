import React, { Component } from 'react'
import timezones from '../../services/timezones'
import { connect } from 'react-redux'
import * as signupActions from '../../actions/signupActions'
import { 
  withCheckFieldValid,
  withRemoveFieldErrors,
  withRemoveAllFieldsErrors 
} from '../../actions/HOAs/withFieldCheckActions'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { isEmpty } from '../../services/utils'
import TextFieldGroup from '../../components/TextFieldGroup'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: ''
    }
  }

  static propTypes = {
    signupInfo: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      errors: PropTypes.object.isRequired,
    }),
    signupPending: PropTypes.func.isRequired,
    signupSuccess: PropTypes.func.isRequired,
    signupFailure: PropTypes.func.isRequired,
    signupRequest: PropTypes.func.isRequired,
    checkFieldValid: PropTypes.func.isRequired,
    removeFieldErrors: PropTypes.func,
    removeAllFieldsErrors: PropTypes.func,
  }

  componentWillUnmount() {
    // 清除所有 field 下的 errors
    this.props.removeAllFieldsErrors()
  }

  validateSignupInput(userData) {
    // 前端校验, 对所有表单内的 input 校验
    const errors = {}
    for (const [field, value] of Object.entries(userData)) {
      if (isEmpty(value)) {
        errors[field] = 'This field is empty'
      }
    }

    if (userData.password !== userData.passwordConfirmation) {
      errors.passwordConfirmation = 'Password must match'
    }

    return errors
  }

  handleInputBlur = e => {
    // 在 blur 的情况下也进行简单验证
    const field = e.target.name
    const value = e.target.value

    if (isEmpty(value)) {
      this.props.checkFieldValid(field, 'This field is empty')
    } else if (field === 'passwordConfirmation' && this.state.password !== value) {
      this.props.checkFieldValid('passwordConfirmation', 'Password must match')
    } else {
      this.props.checkFieldValid(field, '')
    }
  }

  handleInputFocus = e => {
    const field = e.target.name

    this.props.removeFieldErrors(field)

  }

  handleSubmit = e => {
    e.preventDefault()
    const { signupRequest, signupFailure } = this.props
    const errors = this.validateSignupInput(this.state)
    if (isEmpty(errors)) {
      // 无错误, 向后端发送请求
      signupRequest(this.state)
    } else {
      // 存在错误, dispatch 一个 action
      signupFailure(errors)
    }
  }

  handleInputChange = (e) => {
    const isCheckbox = e.target.type === 'checkbox'

    this.setState({
      [e.target.name]: isCheckbox
        ? e.target.checked
        : e.target.value
    })
  }

  render() {
    const { errors, isLoading } = this.props.signupInfo

    return (
      <form onSubmit={this.handleSubmit} className="m-3">
        <TextFieldGroup 
          field='username'
          label='Username'
          type='text'
          placeholder='Enter username'
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          handleInputFocus={this.handleInputFocus}
          value={this.state.username}
          error={errors.username}
        />

        <TextFieldGroup 
          field='email'
          label='Email'
          type='email'
          placeholder='Enter email'
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          handleInputFocus={this.handleInputFocus}
          value={this.state.email}
          error={errors.email}
        />

        <TextFieldGroup 
          field='password'
          label='Password'
          type='password'
          placeholder='Enter passowrd'
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          handleInputFocus={this.handleInputFocus}
          value={this.state.password}
          error={errors.password}
        />

        <TextFieldGroup 
          field='passwordConfirmation'
          label='Password Confirmation'
          type='password'
          placeholder='Enter password confirmation'
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          handleInputFocus={this.handleInputFocus}
          value={this.state.passwordConfirmation}
          error={errors.passwordConfirmation}
        />

        <div className="form-group">
          <label>Timezone</label>
          <select
            className={classNames('form-control', { 'is-invalid': errors.timezone })}
            name="timezone"
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            value={this.state.timezone}
          >
            <option value="" disabled>Choose Your Timezone</option>
            {Object.entries(timezones).map(([k, v]) => (
              <option key={k} value={v}>{k}</option>
            ))}
          </select>
          {errors.timezone && <div className="invalid-feedback">{errors.timezone}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    signupInfo: state.signupInfo
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...signupActions,
    checkFieldValid: withCheckFieldValid('SIGNUP'),
    removeFieldErrors: withRemoveFieldErrors('SIGNUP'),
    removeAllFieldsErrors: withRemoveAllFieldsErrors('SIGNUP'),
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)