const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./User')

class Bet extends Model { }

Bet.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'bets'
  }

)

module.exports = Bet