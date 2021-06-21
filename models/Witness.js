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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'witness_id'
  }
)

module.exports = Witness