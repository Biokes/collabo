const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const AccountController = require('../controller/accountController')

router.get('/', (req, res) => {
  res.send('Server is Up and running');
});

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/transfer', AccountController.transfer);
router.get('/getBalance/:userId', AccountController.getBalance);

module.exports = router;
