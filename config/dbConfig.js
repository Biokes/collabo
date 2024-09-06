const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:Sunepa1234@localhost:3306/worldNationBank', {
  logging: false
});

module.exports = sequelize;
