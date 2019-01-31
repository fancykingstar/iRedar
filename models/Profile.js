const mongoose = require('mongoose');

const ProfileSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  bio: {
    type: String,
    default: 'Hello everyone',
  },
  avatar: {
    type: String,
  },
};

module.exports = mongoose.model('Profile', ProfileSchema);
