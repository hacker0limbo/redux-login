const express = require('express')
const signup = require('./routes/signup')
const login = require('./routes/login')
const logout = require('./routes/logout')
const users = require('./routes/users')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')

// .env 配置
dotenv.config()

const app = express()

// 静态文件
app.use(express.static(path.join(__dirname, '../', 'build')))


app.use(bodyParser.json())
// 路由
app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/logout', logout)
app.use('/api/users', users)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'))
})

app.listen(5000, () => console.log('server starts at port 5000'))