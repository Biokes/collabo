const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); 
const User = require('./User');

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accountType: {
    type: DataTypes.ENUM,
    values: ['Checking', 'Savings', 'Credit'],
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    unique: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Account;
