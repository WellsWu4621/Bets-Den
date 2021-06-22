const { User } = require('../models')

const users = [
  {
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    DiscordName: 'JohnDoe#4657',
    password: 'password1234'
  }
]

const seedUsers = () => User.bulkCreate(users)

module.exports = seedUsers
