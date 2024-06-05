const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file
const Account = require('./Account'); // Import the Account model

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addressStreet: {
    type: DataTypes.STRING
  },
  addressCity: {
    type: DataTypes.STRING
  },
  addressState: {
    type: DataTypes.STRING
  },
  addressZip: {
    type: DataTypes.STRING
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
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

// Establish the one-to-one relationship
User.hasOne(Account, { foreignKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
