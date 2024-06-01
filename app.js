const express = require('express');
const app = express();
const router = require('./router/router'); 

const port = 3000;

app.use('/', router); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
