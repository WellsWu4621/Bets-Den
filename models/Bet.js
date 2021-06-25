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
    creator_value: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    for_value: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    against_value: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'bets'
  }

)

module.exports = Bet