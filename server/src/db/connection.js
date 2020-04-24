const path = require('path')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'data.db')
  },
  useNullAsDefault: true
})

const db = require('bookshelf')(knex)

module.exports = db