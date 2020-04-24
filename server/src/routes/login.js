const express = require('express')
const router = express.Router()
const validator = require('validator')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
  const { identifier, password } = req.body

  // 后端不做校验, 直接验证身份
  UserModel.query({
    where: { username: identifier },
    orWhere: { email: identifier },
  }).fetch({ require: false }).then(user => {
    if (user) {
      // 如果存在用户 进行密码校验
      if (bcrypt.compareSync(password, user.get('pwd'))) {
        // 身份校验成功, 返回客户端 jwt token
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username')
        }, process.env.JWT_PRIVATE_KEY)

        res.json({
          message: {
            type: 'success',
            text: 'You login successfully, Welcome'
          },
          token
        })
      } else {
        // 密码错误
        res.status(401).json({
          errors: {
            msg: 'Invalid password'
          },
          message: {
            type: 'danger',
            text: 'Invalid Credentials, password is wrong'
          }
        })
      }
    } else {
      // 不存在该用户
      res.status(401).json({
        errors: {
          msg: 'Invalid username or email'
        },
        message: {
          type: 'danger',
          text: 'Invalid Credentials, no such username or email'
        }
      })
    }
  }).catch(err => {
    console.log('login server err', err)
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