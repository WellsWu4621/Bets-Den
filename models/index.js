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
  onDelete: 'CASCADE'
})
// Witness bets connection
Witness.belongsTo(Bet, {
  foreignKey: 'bet_id',
  onDelete: 'CASCADE'
})
Bet.hasMany(Witness, {
  foreignKey: 'bet_id',
  onDelete: 'CASCADE'
})

// participant foreign key
// participant user connection
Participant.belongsTo(User, {
  foreignKey: 'user_id',
})
User.hasMany(Participant, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
// participant bets connection
Participant.belongsTo(Bet, {
  foreignKey: 'bet_id',
  onDelete: 'CASCADE'
})
Bet.hasMany(Participant, {
  foreignKey: 'bet_id',
  onDelete: 'CASCADE'
})

module.exports = { User, Bet, Participant, Witness }
