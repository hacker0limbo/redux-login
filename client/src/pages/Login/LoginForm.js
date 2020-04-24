import React, { Component } from 'react'
import TextFieldGroup from '../../components/TextFieldGroup'
import { connect } from 'react-redux'
import * as loginActions from '../../actions/loginActions'
import { 
  withCheckFieldValid, 
  withRemoveFieldErrors, 
  withRemoveAllFieldsErrors, 
} from '../../actions/HOAs/withFieldCheckActions'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { isEmpty } from '../../services/utils'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      identifier: '',
      password: '',
    }
  }

  static propTypes = {
    authInfo: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      errors: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
    }),
    loginPending: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    loginFailure: PropTypes.func.isRequired,
    loginRequest: PropTypes.func.isRequired,
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
    const errors = Object.entries(userData).reduce((err, [field, value]) => {
      if (isEmpty(value)) {
        return {
          ...err,
          [field]: 'This field is empty'
        }
      }
      return err
    }, {})
    return errors
  }

  handleSubmit = e => {
    e.preventDefault()

    const { loginRequest, loginFailure } = this.props
    const errors = this.validateSignupInput(this.state)
    if (isEmpty(errors)) {
      // 无错误, 向后端发送请求
      loginRequest(this.state)
    } else {
      // 存在错误, dispatch 一个 action
      loginFailure(errors)
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleInputBlur = e => {
    // 在 blur 的情况下也进行简单验证
    const field = e.target.name
    const value = e.target.value

    if (isEmpty(value)) {
      this.props.checkFieldValid(field, 'This field is empty')
    } else {
      this.props.checkFieldValid(field, '')
    }
  }

  handleInputFocus = e => {
    const field = e.target.name

    this.props.removeFieldErrors(field)
  }

  render() {
    const { errors, isLoading } = this.props.authInfo

    return (
      <form onSubmit={this.handleSubmit} className="m-3">
        <TextFieldGroup 
          field="identifier"
          label="Username / Email"
          type='text'
          placeholder='Enter username or email'
          value={this.state.identifier}
          error={errors.identifier}
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          handleInputFocus={this.handleInputFocus}
        />

        <TextFieldGroup 
          field="password"
          label="Password"
          type='password'
          placeholder='Enter password'
          value={this.state.password}
          error={errors.password}
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          handleInputFocus={this.handleInputFocus}
        />

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Login'}
        </button>

      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.authInfo
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...loginActions,
    checkFieldValid: withCheckFieldValid('LOGIN'),
    removeFieldErrors: withRemoveFieldErrors('LOGIN'),
    removeAllFieldsErrors: withRemoveAllFieldsErrors('LOGIN'),
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)