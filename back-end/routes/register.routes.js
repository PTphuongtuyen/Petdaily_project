const express = require('express');
const registerController = require('../controllers/register.controller');

const router = express.Router();

// Route đăng ký
router.post('/register', registerController.registerUser);

module.exports = router;
