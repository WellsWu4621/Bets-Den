const pls = require('passport-local-sequelize')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = pls.defineUser(sequelize, {
  // your columns here...
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  DiscordName: DataTypes.STRING,
  Tokens: DataTypes.INTEGER,
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
)

module.exports = User
