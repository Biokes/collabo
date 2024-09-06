const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Account = require('./Account');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Credit', 'Debit'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'proccessed', 'Failed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  referenceId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: {
      model: Account,
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Transaction;
