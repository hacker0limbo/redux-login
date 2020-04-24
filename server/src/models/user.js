const db = require('../db/connection')

const UserModel = db.Model.extend({
  hasTimestamps: true,
  tableName: 'users'
})

module.exports = UserModel