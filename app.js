const express = require('express');
const app = express();
const router = require('./router/router'); 
const sequelize = require('./config/dbConfig'); 
const User = require('./models/User');
const Account = require('./models/Account');
const bodyParser = require('body-parser');
const Transaction = require('./models/Transaction');

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.use('/', router); 


sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created (if not existed)!');
    console.log('Tables created successfully.');
  })
  .catch(err => {
    console.error('Unable to create database and tables:', err);
  });


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
