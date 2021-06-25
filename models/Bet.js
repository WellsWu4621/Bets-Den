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
    for_count: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    against_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // options are 0,1,2: 0 is not done, 1 is done for win, 2 is done against win
    isResolved: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'bets'
  }

)

module.exports = Bet