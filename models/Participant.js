const { Model, DataTypes } = require('sequelize')

const sequelize = require('../db')

class Participant extends Model { }

Participant.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alignCreator: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    betamount: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    bet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'bets',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'participants'
  }
)

module.exports = Participant
