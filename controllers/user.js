const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const { normalizeErrors } = require('../helpers/mongoose');

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
      errors: [{ title: 'Invalid Input', detail: 'All fields are required' }],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
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
    return res.json({ success: true });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: 'Invalid Input', detail: 'Email and password are required' },
      ],
    });
  }
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

    const matched = await user.hasSamePassword(password);

    if (!matched) {
      return res.status(422).send({
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
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
