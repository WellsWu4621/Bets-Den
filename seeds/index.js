require('dotenv').config()

const seedBets = require('./bets.js')
const sequelize = require('../db')

async function seedAll () {
  await sequelize.sync({ force: true })
  await seedBets()
  process.exit()
}

seedAll()
