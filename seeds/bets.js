const { Bets } = require('../models')

const bets = [
  {
    "title": "Bet Test 1",
    "description": "asdfjlkhasldkghjas;lfdhjslkjfdl;sakdjf",
    "value": 500,
    "creator_id": 1
  }
]

const seedBets = () => Bets.bulkCreate(bets)

module.exports = seedBets
