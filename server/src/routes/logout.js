const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')

router.post('/', (req, res) => {
  const { id, username } = req.body

  UserModel.where({ id, username }).fetch({ require: false }).then(user => {
    if (user) {
      res.json({
        message: {
          type: 'success',
          text: 'You logout successfully!'
        }
      })
    } else {
      res.json({
        message: {
          type: 'warning',
          text: 'You can not logout without login!'
        }
      })
    }
  }).catch(err => {
    console.log('logout server error', err)
    res.status(500).json({
      message: {
        type: 'danger',
        text: 'Server error'
      }
    })
  })
})

module.exports = router