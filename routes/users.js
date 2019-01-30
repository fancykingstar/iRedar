const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', userController.postRegister);

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
router.post('/login', userController.postLogin);

// @route POST api/users/reset-password
// @desc Reset user password
// @access Public
router.post('/reset-password', userController.postPasswordForget);

module.exports = router;
