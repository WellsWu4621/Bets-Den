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
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'participants'
  }
)

module.exports = Participant
