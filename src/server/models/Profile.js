const mongoose = require('mongoose');

const ProfileSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: {
    type: String,
    default: 'none',
  },

  avatar: {
    type: String,
  },
  firstLogin: { type: Boolean, default: true },
};

module.exports = mongoose.model('Profile', ProfileSchema);
