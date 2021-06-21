const User = require('./User.js')
const Bets = require('./Bets')
const Witness = require('./Witness')
const Participant = require('./Participant')

// your relationships go here...
// creatorid foreign key
Bets.belongsTo(User, {
  foreignKey: 'creator_id',
})
User.hasMany(Bets, {
  foreignKey: 'creator_id',
})

// witness foreign key
Bets.belongsToMany(User, {
  through: Witness,
  foreignKey: 'witness_id',
})
User.belongsToMany(Bets, {
  through: Witness,
  foreignKey: 'witness_id',
})

// participant foreign key
Bets.belongsToMany(User, {
  through: Participant,
  foreignKey: 'participant_id',
})
User.belongsToMany(Bets, {
  through: Participant,
  foreignKey: 'participant_id',
})

module.exports = { User, Bets }
