const mongoose = require('mongoose');

const PermissionSchema = {
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    require: true,
  },

  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    require: true,
  },

  role: { type: String, default: 'client' },
};

module.exports = mongoose.model('Permission', PermissionSchema);
