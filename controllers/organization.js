const validator = require('validator');
const logger = require('../configs/logger');

// Load models
const Organization = require('../models/Organization');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile');

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
        detail: 'All fields are required',
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
        email: 'Organization already exists',
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
        detail: 'Your user have been created',
      },
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

// @route POST api/organizations/permission
// @desc Create permission
// @access Private
exports.postPermission = async (req, res) => {
  const { name, profileId } = req.body;

  if (!name || validator.isEmpty(name, { ignore_whitespace: true })) {
    return res.status(422).json({
      name: 'Organization name is required',
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
    const profile = await Profile.findOne({ id: profileId });
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

// @route GET api/organizations/permission/:id
// @desc Return current user's permission
// @access Private
exports.getPermission = async (req, res) => {
  try {
    const permission = await Permission.findOne({
      profile: req.params.id,
    });

    return res.json({
      success: true,
      permission,
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
