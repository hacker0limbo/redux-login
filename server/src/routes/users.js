const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

router.get('/:id', authenticate, (req, res) => {
  const currentUser = req.currentUser

  if (req.params.id != currentUser.id) {
    res.status(401).json({
      message: {
        type: 'danger',
        text: 'Authentication not matched'
      }
    })
  } else {
    res.json({ user: currentUser })
  }
})

module.exports = router