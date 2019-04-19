const validator = require('validator');
const logger = require('../configs/logger');

// Load models
const Organization = require('../models/Organization');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile');

///  Mapping for Role-Permission
const rolesToPermission = {
  //rolesToPermission["USER"]
  "USER": ["canRead"],
  "CLIENT": ["canRead","canWrite","canSubmit"],
  "PARTNER": ["canWrite","canUpdate","canRead","canSubmit"],
  "STAFF": ["canCreate","canWrite","canUpdate","canRead","canSubmit"],
  "ADMIN": ["canRead", "canCreate", "canWrite", "canUpdate", "canDelete", "canSubmit", "canAddUser", "canEditUser", "canViewUser", "canDeleteUser"]
};

// @route POST api/organizations/register
// @desc Register organization
// @access Public
exports.postRegister = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    street,
    city,
    province,
    country,
    postalCode,
  } = req.body;

  if (
    !name
    || !email
    || !phoneNumber
    || !street
    || !city
    || !province
    || !country
    || !postalCode
  ) {
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'All fields are required'
      },
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(422).json({
      email: 'Invalid Email',
    });
  }

  try {
    const existingOrganization = await Organization.findOne({ name });
    if (existingOrganization) {
      return res.status(422).json({
        email: 'Organization already exists'
      });
    }

    const organization = await new Organization({
      name,
      email,
      phoneNumber,
      address: {
        street,
        city,
        province,
        country,
        postalCode,
      },
    });
    await organization.save();

    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: 'Your user have been created'
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server Error: Please try again'
      },
    });
  }
};

// @route POST api/organizations/permission
// @desc Create permission
// @access Private
exports.postPermission = async (req, res) => {
  const { name, profileId } = req.body;

  if (!name || validator.isEmpty(name, { ignore_whitespace: true })) {
    return res.status(422).json({
      name: 'Organization name is required'
    });
  }

   try {
    const organization = await Organization.findOne({ name });

    // Check if organization exists
    if (!organization) {
      return res.status(422).json({
        name: 'Organization does not exists',
      });
    }

    // Check if profile exists
    const profile = await Profile.findOne({ _id: profileId });
    if (!profile) {
      return res.status(422).json({
        name: 'User does not exists',
      });
    }

    // Check if permission exists
    const existingPermission = await Permission.findOne({
      organization: organization.id,
      profile: profile.id,
    });

    console.log(existingPermission);
    if (existingPermission) {
      return res.status(422).json({
        name: 'Your permission already existed',
      });
    }

    // Create new permission
    const permission = await new Permission({
      organization: organization._id,
      profile: profile._id,
    });

    await permission.save();

    return res.json({
      success: true,
      permission,
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server Error: Please try again',
      },
    });
  }
};

// @route GET api/organizations/permissions/:profileId
// @desc Return current user's permissions
// @access Private
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({
      profile: req.params.profileId,
    });

    return res.json({
      success: true,
      permissions,
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route GET api/organizations/permissions/admin/:organizationId/:profileId
// @desc Return all organization's permissions
// @access Private
exports.getAdminPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findOne({
      profile: req.params.profileId,
      organization: req.params.organizationId,
    });

    if (permissions.role !== 'admin') {
      return res.status(422).json({
        alert: {
          title: 'Access denied!',
          detail: 'You do not have permissions',
        },
      });
    }

    const allPermissions = await Permission.find({
      organization: req.params.organizationId,
    }).populate('profile');

    return res.json({
      success: true,
      allPermissions,
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route POST api/organizations/permissions/admin/
// @desc Return all organization's permissions
// @access Private
exports.postAdminPermissions = async (req, res) => {
  try {
    const permission = await Permission.findOne({
      _id: req.body.permissionId,
    });

    if (!permission) {
      return res.status(422).json({
        alert: {
          title: 'Not Found!',
          detail: 'Permission does not exist',
        },
      });
    }

    const profile = await Profile.findOne({
      _id: permission.profile,
    });

    if (!profile) {
      return res.status(422).json({
        alert: {
          title: 'Not Found!',
          detail: 'Profile does not exist',
        },
      });
    }


    await profile.updateOne({ role: req.body.role.toUpperCase(), permissionRight: rolesToPermission[req.body.role.toUpperCase()] });
    await permission.updateOne({ role: req.body.role });

    const allPermissions = await Permission.find({
      organization: req.params.organizationId,
    }).populate('profile');

    return res.json({
      success: true,
      allPermissions,
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};
