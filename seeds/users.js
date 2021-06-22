const { User } = require('../models')

const users = [
  {
    username: 'johndoe',
    password: 'password1234'
  }
]

const seedUsers = () => User.bulkCreate(users)

module.exports = seedUsers
