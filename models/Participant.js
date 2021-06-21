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
      autoIncrement: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'participant_id'
  }
)

module.exports = Participant