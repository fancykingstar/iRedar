const validator = require('validator');
const logger = require('../configs/logger');
const stripeLibrary = require('../helpers/stripeSubscription');

// Load models
const Organization = require('../models/Organization');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile');
const User = require('../models/User');

///  Mapping for Role-Permission
const rolesToPermission = {
  "user": ["canRead"],
  "client": ["canRead", "canWrite", "canSubmit"],
  "partner": ["canWrite", "canUpdate", "canRead", "canSubmit"],
  "staff": ["canCreate", "canWrite", "canUpdate", "canRead", "canSubmit"],
  "admin": ["canRead", "canCreate", "canWrite", "canUpdate", "canDelete", "canSubmit", "canAddUser", "canEditUser", "canViewUser", "canDeleteUser"]
};

const domain_regex = new RegExp("(?<=@)[^.]+.*$");

// @route POST api/organizations/register
// @desc Register organization
// @access Public
exports.postRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    name,
    email,
    password,
    passwordConfirmation,
    phone,
    street,
    city,
    province,
    country,
      postalCode,
      selectedPlan
  } = req.body;

  if (
      !name
      || !firstName
      || !lastName
      || !email
      || !phone
      || !selectedPlan
  //|| !street
  //|| !city
  //|| !province
  //|| !country
  //|| !postalCode
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

  if (password.length < 6) {
    return res.status(422).json({
      password: 'Password must be at least 6 characters',
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).json({
      passwordConfirmation: 'Password is not a same as confirmation',
    });
  }
  // variables for domain name

  let role = "admin";
  let permission = rolesToPermission[role];

  try {
    const existingOrganization = await Organization.findOne({ name });
    if (existingOrganization) {
      return res.status(422).json({
        email: 'Organization already exists'
      });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(422).json({
        alert: {
          title: 'Error!',
          detail: 'User already exists'
        }
      });
    }

    const r = email.match(domain_regex);
    let userDomain = email;
    if (r) {
      userDomain = r[0];
    }

    let organization = await new Organization({
      name,
      email,
      phoneNumber: phone,
      userDomain
      /*
      address: {
        street,
        city,
        province,
        country,
        postalCode,
      },
      */
    });
    await organization.save();

    const user = await new User({
      email,
      password,
    });
    await user.save();

    organization.users.push(user.id);
    await organization.save();

    let profile = await new Profile({
      user: user._id,
      email,
      lastName,
      firstName,
      phoneNumber: phone,
      domain: userDomain
    }).save();

    let userPermission = await new Permission({
      profile: profile._id,
      organization: organization._id,
      role: role.toLowerCase(),
      permissionRight: permission
    });
    await userPermission.save();
      await stripeLibrary.doCreateAdminUserWithPlanAndSubscribe(profile._id, selectedPlan);

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

    await permission.updateOne({role: req.body.role, permissionRight: rolesToPermission[req.body.role]});

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
