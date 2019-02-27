const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/organization');

// @route POST api/organizations/register
// @desc Register organizations
// @access Public
router.post('/register', userController.postRegister);

// @route POST api/organizations/permission
// @desc Register organizations
// @access Private
router.post(
  '/permission',
  passport.authenticate('jwt', { session: false }),
  userController.postPermission,
);

// @route POST api/organizations/permissions/:profileId
// @desc Return current user profile
// @access Private
router.get(
  '/permissions/:profileId',
  passport.authenticate('jwt', { session: false }),
  userController.getPermissions,
);
// @route GET api/organizations/permissions/admin/:organizationId/:profileId
// @desc Return all organization's permissions
// @access Private
router.get(
  '/permissions/admin/:organizationId/:profileId',
  passport.authenticate('jwt', { session: false }),
  userController.getAdminPermissions,
);

// @route POST api/organizations/permissions/admin/
// @desc Return all organization's permissions
// @access Private
router.post(
  '/permissions/admin',
  passport.authenticate('jwt', { session: false }),
  userController.postAdminPermissions,
);

module.exports = router;
