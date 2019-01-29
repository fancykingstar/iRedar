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
    lastName,
    firstName,
  } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: 'Data missing!', detail: 'Provide email and password!' },
      ],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: 'Invalid passsword!',
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
            title: 'Invalid email!',
            detail: 'User with this email already exist!',
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
        { title: 'Data missing!', detail: 'Provide email and password!' },
      ],
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({
        errors: [{ title: 'Invalid User!', detail: 'User does not exist' }],
      });
    }

    const matched = await user.hasSamePassword(password);

    if (!matched) {
      return res.status(422).send({
        errors: [{ title: 'Wrong Data!', detail: 'Wrong email or password' }],
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

    return res.json(token);
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};
