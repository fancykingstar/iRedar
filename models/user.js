const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
  },
  password: {
    type: String,
    min: [6, 'Password is too short, min is 6 characters'],
    required: 'Password is required',
  },
  confirmToken: String,

  firstLogin: { type: Boolean, default: true },
  organizations: [
    {
      organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
      },
      role: { type: String, default: 'client' },
    },
  ],
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: String,
});

UserSchema.methods.hasSamePassword = function (requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
