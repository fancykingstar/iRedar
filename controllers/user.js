const jwt = require('jsonwebtoken');
const validator = require('validator');
const keys = require('../configs/keys');
const logger = require('../configs/logger');
const nodeMailer = require('../helpers/nodemailer');

const { resetPasswordEmail } = require('../helpers/htmlMails/reset-password');

// Load models
const User = require('../models/User');
const Profile = require('../models/Profile');

// @route POST api/users/register
// @desc Register user
// @access Public
exports.postRegister = async (req, res) => {
  const {
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
  } = req.body;

  if (!password || !email || !firstName || !lastName) {
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'All fields are required',
      },
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(422).json({
      email: 'Invalid Email',
    });
  }

  if (password.length < 6) {
    return res.status(422).json({
      password: 'Password must be at least 6 characters',
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).json({
      passwordConfirmation: 'Password is not a same as confirmation',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        email: 'User already exists',
      });
    }

    const user = await new User({
      email,
      password,
      lastName,
      firstName,
    });
    await user.save();

    await new Profile({
      // eslint-disable-next-line no-underscore-dangle
      user: user._id,
      lastName: user.lastName,
      firstName: user.firstName,
    }).save();

    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: 'Your user have been created',
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server Error: Please try again',
      },
    });
  }
};

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(validator.isEmpty(password, { ignore_whitespace: true }));

  if (!password || !email) {
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'All fields are required',
      },
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(422).json({
      email: 'Invalid Email',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ email: 'User does not exists' });
    }

    const matched = await user.hasSamePassword(password);

    if (!matched) {
      return res.status(422).json({
        password: 'Wrong password',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      keys.secretOrKey,
      { expiresIn: '1h' },
    );

    if (user.firstLogin) await user.updateOne({ firstLogin: false });

    user.save();

    return res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route GET api/users/:id
// @desc Return current user
// @access Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });

    return res.json({
      success: true,
      profile,
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route POST api/users/reset-password
// @desc Reset password
// @access Public
exports.postResetPassword = async (req, res) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(422).json({
      email: 'Invalid Email',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ email: 'User does not exists' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email,
      },
      keys.secretOrKey,
      { expiresIn: '1h' },
    );

    user.confirmToken = token;

    await user.save();

    const mailOptions = {
      from: '"iAuto" <iauto.iradardata@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Password Reset', // Subject line
      html: resetPasswordEmail('localhost:3000', token), // html body
    };

    try {
      nodeMailer(mailOptions);
    } catch (error) {
      logger.error(error);
      return res.status(422).json({
        alert: {
          title: 'Error!',
          detail: 'An error occurred while sending password reset',
        },
      });
    }

    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: "We've sent an email to reset password",
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route   PUT api/users/reset-password
// @desc    Reset password
// @access  Public
exports.putResetPassword = async (req, res) => {
  const { confirmToken, password, passwordConfirmation } = req.body;

  try {
    const user = await User.findOne({ confirmToken });

    if (!user || !user.confirmToken) {
      return res.status(422).json({
        alert: {
          title: 'Error!',
          detail: 'Token has expired',
        },
      });
    }

    try {
      await jwt.verify(confirmToken, keys.secretOrKey);
    } catch (error) {
      logger.error(error);
      return res.status(422).json({
        alert: {
          title: 'Error!',
          detail: 'Token has expired',
        },
      });
    }

    if (password.length < 6) {
      return res.status(422).json({
        password: 'Password must be at least 6 characters',
      });
    }

    if (password !== passwordConfirmation) {
      return res.status(422).json({
        passwordConfirmation: 'Password is not a same as confirmation',
      });
    }

    user.password = password;
    user.confirmToken = undefined;

    await user.save();
    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: 'Password has been reset',
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};
