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
    alignCreator: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    // Not sure if we need this in order to pass in the users name
    // user_name: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'Users',
    //     key: 'name'
    //   }
    // },
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
    freezeTableName: true,
    underscored: true,
    modelName: 'participants'
  }
)

module.exports = Participant