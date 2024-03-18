const express = require('express');
const authController = require('../controllers/auth-controller');

const router = express.Router();

// login route with controller

router.post('/login', authController.login);

module.exports = router;
