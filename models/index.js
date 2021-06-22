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

// Witness foreign key
// Witness user connection
Witness.belongsTo(User, {
  foreignKey: 'user_id',
})
User.hasMany(Witness, {
  foreignKey: 'user_id',
})
// Witness bets connection
Witness.belongsTo(Bets, {
  foreignKey: 'bet_id',
})
Bets.hasMany(Witness, {
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
Participant.belongsTo(Bets, {
  foreignKey: 'bet_id',
})
Bets.hasMany(Participant, {
  foreignKey: 'bet_id',
})

module.exports = { User, Bets, Participant, Witness }
