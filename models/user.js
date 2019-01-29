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
    // eslint-disable-next-line no-useless-escape
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    min: [6, 'Password is too short, min is 6 characters'],
    max: [32, 'Password is too long, max is 32 characters'],
    required: 'Password is required',
  },
  confirmToken: String,
  confirmTokenExpires: Date,
  role: { type: String, default: 'client' },
  firstLogin: { type: Boolean, default: true },
  businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }],
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
