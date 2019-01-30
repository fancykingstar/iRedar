const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const logger = require('../configs/logger');
const { normalizeErrors } = require('../helpers/mongoose');
const nodeMailer = require('../helpers/nodemailer');
const { resetPasswordEmail } = require('../helpers/htmlMails/reset-password');

// Load models
const User = require('../models/user');

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
    return res.status(422).send({
      success: false,
      errors: [{ title: 'Invalid Input', detail: 'All fields are required' }],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      success: false,
      errors: [
        {
          title: 'Invalid Passsword',
          detail: 'Password is not a same as confirmation!',
        },
      ],
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({
        success: false,
        errors: [
          {
            title: 'Invalid Email',
            detail: 'User already exists',
          },
        ],
      });
    }

    const user = new User({
      email,
      password,
      lastName,
      firstName,
    });

    await user.save();
    return res.json({
      success: true,
      message: 'Your user have been created',
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .send({ success: false, errors: normalizeErrors(err.errors) });
  }
};

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      success: false,
      errors: [
        { title: 'Invalid Input', detail: 'Email and password are required' },
      ],
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({
        success: false,
        errors: [
          {
            title: 'Invalid Authentication',
            detail: 'User does not exists',
          },
        ],
      });
    }

    const matched = await user.hasSamePassword(password);

    if (!matched) {
      return res.status(422).send({
        success: false,
        errors: [
          {
            title: 'Invalid Authentication',
            detail: 'Wrong password',
          },
        ],
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

    return res.json({ token });
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .send({ success: false, errors: normalizeErrors(err.errors) });
  }
};

exports.postPasswordForget = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({
        errors: [
          {
            title: 'Invalid Authentication',
            detail: 'User does not exists',
          },
        ],
      });
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
    user.confirmTokenExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const mailOptions = {
      from: '"iAuto" <iauto.iradardata@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Password Reset', // Subject line
      html: resetPasswordEmail('localhost:5000', token), // html body
    };

    try {
      nodeMailer(mailOptions);
    } catch (err) {
      logger.error(err);
      return res.json({
        success: false,
        errors: [
          {
            title: 'Invalid Authentication',
            detail: 'An Error occured while sending password reset',
          },
        ],
      });
    }

    return res.json({
      success: true,
      message: "We've sent an email to reset password",
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .send({ success: false, errors: normalizeErrors(err.errors) });
  }
};
