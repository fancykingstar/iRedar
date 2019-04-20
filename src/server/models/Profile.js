const mongoose = require('mongoose');
const ROLES = ["USER", "STAFF", "ADMIN", "CLIENT", "PARTNER"];


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
  role: {
    type: String,
    enum: ROLES,
    default: "USER"
  },
  permissionRight: {
    type: [String],
    enum: PERMISSION,
    require: true,
    default: ["canRead"]
  },
  domain: {
    type: String,
    required: true
  },

};

module.exports = mongoose.model('Profile', ProfileSchema);
