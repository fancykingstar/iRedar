const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/user');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register/client', userController.postClientRegister);

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
router.post('/login', userController.postLogin);

// @route POST api/users/adduser
// @desc Add new user
// @access Private
router.post('/register/user', userController.postRegister);

// @route POST api/users/deleteuser
// @desc Add new user
// @access Private
router.post('/deleteuser', userController.deleteUser);

// @route   PUT api/users/updateuser
// @desc    Update User
// @access  Public
router.put('/updateuser', userController.putUpdateUser);

// @route POST api/users/reset-password
// @desc Reset user password
// @access Public
router.post('/reset-password', userController.postResetPassword);

// @route   PUT api/users/reset-password
// @desc    Reset password
// @access  Public
router.put('/reset-password', userController.putResetPassword);

// @route POST api/users/:id
// @desc Return current user profile
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getProfile,
);

module.exports = router;
