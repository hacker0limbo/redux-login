const express = require('express')
const router = express.Router()
const validator = require('validator')
const { isEmpty } = require('../utils')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const validateSignupInput = userData => {
  const errors = {}
  // 也可以用 reduce 集成
  for (const [field, value] of Object.entries(userData)) {
    if (isEmpty(value)) {
      errors[field] = 'This field is empty'
    }
  }

  if (!validator.isLength(userData.username, { min: 3, max: 10 })) {
    errors.username = 'Username must be in length between 3 and 10'
  }

  if (!validator.isEmail(userData.email) && !isEmpty(userData.email)) {
    errors.email = 'Email is invalid'
  }

  if (!validator.equals(userData.password, userData.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match'
  }

  return errors
}

const validateSignupDuplicateFields = userData => {
  const errors = validateSignupInput(userData)

  return UserModel.query({
    where: { email: userData.email },
    orWhere: { username: userData.username }
  }).fetch({ require: false }).then(user => {
    // fetch 需要设置 require: false 来让返回的 user model 为 null
    // 否则抛出异常
    if (user) {
      if (user.get('username') === userData.username) {
        errors.username = 'There is already a user with such username'
      }
      if (user.get('email') === userData.email) {
        errors.email = 'There is already a user with such email'
      }
    }
    return errors
  })
}

router.post('/', (req, res) => {
  validateSignupDuplicateFields(req.body).then(errors => {
    if (!isEmpty(errors)) {
      // 存在错误
      res.status(400).json({
        errors,
        message: {
          type: 'danger',
          text: 'Something went wrong, please recheck your form and try again.'
        }
      })
    } else {
      const { password, passwordConfirmation, ...rest } = req.body
      const pwd = bcrypt.hashSync(password, 10)

      UserModel.forge({ ...rest, pwd }).save()
        .then(user => {
          res.status(200).json({
            message: {
              type: 'success',
              text: 'You sign up successfully, welcome!'
            },
          })
        }).catch(errors => {
          console.log('signup db save errors', errors)
          res.status(500).json({
            errors,
            message: {
              type: 'danger',
              text: 'Something wrong with server'
            }
          })
        })
    }
  }).catch(err => {
    console.log('signup server err', err)
    res.status(500).json({
      errors: err,
      message: {
        type: 'danger',
        text: 'Something wrong with server'
      }
    })
  })
})

module.exports = router
