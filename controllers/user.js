const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
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
      errors: [{ title: 'Invalid Input', detail: 'All fields are required' }],
    });
  }

  if (!emailValidator.validate(email)) {
    return res.status(422).json({
      errors: [
        {
          title: 'Invalid Email',
          detail: 'Email in invalid',
        },
      ],
    });
  }

  if (password.length < 6) {
    return res.status(422).json({
      errors: [
        {
          title: 'Invalid Password',
          detail: 'Password is too short, min is 6 characters',
        },
      ],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).json({
      errors: [
        {
          title: 'Invalid Password',
          detail: 'Password is not a same as confirmation',
        },
      ],
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        errors: [
          {
            title: 'Invalid Email',
            detail: 'User already exists',
          },
        ],
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
      message: 'Your user have been created',
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .json({ title: 'Server Error', detail: 'Please try again' });
  }
};

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).json({
      errors: [
        { title: 'Invalid Input', detail: 'Email and password are required' },
      ],
    });
  }

  if (!emailValidator.validate(email)) {
    return res.status(422).json({
      errors: [
        {
          title: 'Invalid Email',
          detail: 'Email in invalid',
        },
      ],
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({
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
      return res.status(422).json({
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

    return res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .json({ title: 'Server Error', detail: 'Please try again' });
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
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .json({ title: 'Server Error', detail: 'Please try again' });
  }
};

// @route POST api/users/reset-password
// @desc Reset password
// @access Public
exports.postResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({
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

    await user.save();

    const mailOptions = {
      from: '"iAuto" <iauto.iradardata@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Password Reset', // Subject line
      html: resetPasswordEmail('localhost:3000', token), // html body
    };

    try {
      nodeMailer(mailOptions);
    } catch (err) {
      logger.error(err);
      return res.status(422).json({
        errors: [
          {
            title: 'Server Error',
            detail: 'An Error occurred while sending password reset',
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
      .json({ title: 'Server Error', detail: 'Please try again' });
  }
};

// @route GET api/users/reset-password/:confirmToken
// @desc  Return user who requested reset password
// @access Public
// exports.getResetPassword = async (req, res) => {
//   const { confirmToken } = req.params;

//   try {
//     const user = await User.findOne({ confirmToken });

//     if (!user) {
//       return res.status(422).json({
//         errors: [
//           {
//             title: 'Invalid Authentication',
//             detail: 'Token has expired',
//           },
//         ],
//       });
//     }

//     try {
//       await jwt.verify(confirmToken, keys.secretOrKey);

//       return res.json({
//         success: true,
//         userId: user.id,
//       });
//     } catch (error) {
//       logger.error(error);
//       return res.status(422).json({
//         errors: [
//           {
//             title: 'Invalid Authentication',
//             detail: 'Token has expired',
//           },
//         ],
//       });
//     }
//   } catch (err) {
//     logger.error(err);
//     return res
//       .status(422)
//       .json({ title: 'Server Error', detail: 'Please try again' });
//   }
// };

// @route   PUT api/users/reset-password
// @desc    Reset password
// @access  Public
exports.putResetPassword = async (req, res) => {
  const { confirmToken, password, passwordConfirmation } = req.body;

  try {
    const user = await User.findOne({ confirmToken });

    if (!user) {
      return res.status(422).json({
        errors: [
          {
            title: 'Invalid Authentication',
            detail: 'Token has expired',
          },
        ],
      });
    }

    try {
      await jwt.verify(confirmToken, keys.secretOrKey);
    } catch (error) {
      logger.error(error);
      return res.status(422).json({
        errors: [
          {
            title: 'Invalid Authentication',
            detail: 'Token has expired',
          },
        ],
      });
    }

    if (password.length < 6) {
      return res.status(422).json({
        errors: [
          {
            title: 'Invalid Password',
            detail: 'Password is too short, min is 6 characters',
          },
        ],
      });
    }

    if (password !== passwordConfirmation) {
      return res.status(422).json({
        errors: [
          {
            title: 'Invalid Password',
            detail: 'Password is not a same as confirmation',
          },
        ],
      });
    }

    if (!user.confirmToken) {
      return res.status(422).json({
        errors: [
          {
            title: 'Invalid Authentication',
            detail: 'Token has expired',
          },
        ],
      });
    }

    user.password = password;
    user.confirmToken = undefined;

    await user.save();
    return res.json({
      success: true,
      message: 'Password has been reset',
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(422)
      .json({ title: 'Server Error', detail: 'Please try again' });
  }
};
