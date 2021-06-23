const User = require('./User.js')
const Bet = require('./Bet.js')
const Witness = require('./Witness')
const Participant = require('./Participant')

// your relationships go here...
// creatorid foreign key
Bet.belongsTo(User, {
  foreignKey: 'creator_id'
})
User.hasMany(Bet, {
  foreignKey: 'creator_id'
})

// Witness foreign key
// Witness user connection
Witness.belongsTo(User, {
  foreignKey: 'user_id',
})
User.hasMany(Witness, {
  foreignKey: 'user_id',
})
// Witness bets connection
Witness.belongsTo(Bet, {
  foreignKey: 'bet_id',
})
Bet.hasMany(Witness, {
  foreignKey: 'bet_id',
})

// participant foreign key
// participant user connection
Participant.belongsTo(User, {
  foreignKey: 'user_id',
})
User.hasMany(Participant, {
  foreignKey: 'user_id',
})
// participant bets connection
Participant.belongsTo(Bet, {
  foreignKey: 'bet_id',
})
Bet.hasMany(Participant, {
  foreignKey: 'bet_id',
})

module.exports = { User, Bet, Participant, Witness }
