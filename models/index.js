const User = require('./User.js')
const Bets = require('./Bets.js')
const Witness = require('./Witness')
const Participant = require('./Participant')

// your relationships go here...
// creatorid foreign key
Bets.belongsTo(User, {
  foreignKey: 'creator_id'
})
User.hasMany(Bets, {
  foreignKey: 'creator_id'
})

// witness foreign key
Bets.belongsToMany(User, {
  through: Witness,
  foreignKey: 'bets_id'
})
User.belongsToMany(Bets, {
  through: Witness,
  foreignKey: 'user_id'
})

// participant foreign key
Bets.belongsToMany(User, {
  through: Participant,
  foreignKey: 'bets_id'
})
User.belongsToMany(Bets, {
  through: Participant,
  foreignKey: 'user_id'
})

module.exports = { User, Bets, Participant, Witness }
