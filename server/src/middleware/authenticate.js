const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers['authorization']
  
  if (authorizationHeader) {
    const token =  authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: {
            type: 'danger',
            text: 'Wrong authentication signature, Failed to authenticate',
          }
        })
      } else {
        UserModel.query({
          where: { id: decoded.id },
          select: ['id', 'email', 'username', 'timezone']
        }).fetch({ require: false }).then(user => {
          if (!user) {
            res.status(404).json({
              message: {
                type: 'danger',
                text: 'No such user, failed to authenticate'
              }
            })
          } else {
            req.currentUser = user
            // 验证身份成功, 将用户信息存到 req 中
            // 移交给下一个中间件
            next()
          }
        })
      }
    })
  } else {
    res.status(403).json({
      message: {
        type: 'danger',
        text: 'Not token provided'
      }
    })
  }
}


module.exports = authenticate