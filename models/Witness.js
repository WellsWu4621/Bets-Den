const { Model, DataTypes } = require('sequelize')

const sequelize = require('../db')

class Witness extends Model { }

Witness.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    modelName: 'witnesses'
  }
)

module.exports = Witness