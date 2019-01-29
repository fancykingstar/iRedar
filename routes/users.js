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

module.exports = router;
