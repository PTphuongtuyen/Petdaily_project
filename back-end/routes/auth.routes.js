const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const registerController = require('../controllers/register.controller')

// //Định nghĩa route đăng ký
// router.post('/register', registerController.register)

//Định nghĩa route đăng nhập
router.post('/login', authController.login);



module.exports = router;
