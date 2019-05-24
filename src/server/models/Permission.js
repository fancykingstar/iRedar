const mongoose = require('mongoose');

const ROLES = ["user", "staff", "admin", "client", "partner"];


const PERMISSION = [
  "canRead",
  "canCreate",
  "canWrite",
  "canUpdate",
  "canDelete",
  "canSubmit",
  "canAddUser",
  "canEditUser",
  "canViewUser",
  "canDeleteUser"
];

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
  role: {
    type: String,
    enum: ROLES,
    default: 'client'
  },
  permissionRight: {
    type: [String],
    enum: PERMISSION,
    require: true,
    default: ["canRead", "canWrite", "canSubmit"]
  }
};

module.exports = mongoose.model('Permission', PermissionSchema);
