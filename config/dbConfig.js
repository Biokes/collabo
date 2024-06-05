const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://your_username:your_password@localhost:3306/your_database_name', {
  logging: false // Disable logging; default: console.log
});

sequelize.sync({ force: false }) // Set to true to drop and re-create the tables every time
  .then(() => {
    console.log('Database & tables created (if not existed)!');
  })
  .catch(err => {
    console.error('Unable to create database and tables:', err);
  });

module.exports = sequelize;
