const express = require('express')
const signup = require('./routes/signup')
const login = require('./routes/login')
const logout = require('./routes/logout')
const users = require('./routes/users')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// .env 配置
dotenv.config()

const app = express()

app.use(bodyParser.json())
// 路由
app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/logout', logout)
app.use('/api/users', users)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(5000, () => console.log('server starts at port 5000'))