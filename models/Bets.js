const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('./User')

class Bets extends Model { }

Bets.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bet'
  }

)

module.exports = Bets