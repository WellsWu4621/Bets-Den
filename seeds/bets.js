const { Bets } = require('../models')

const bets = [
  {
    title: 'Bet Test 1',
    bet: '500',
    uid: 1
  }
]

const seedBets = () => Bets.bulkCreate(bets)

module.exports = seedBets
