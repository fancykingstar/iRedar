const jwt = require('jsonwebtoken');
const validator = require('validator');
const keys = require('../configs/keys');
const logger = require('../configs/logger');
const nodeMailer = require('../helpers/nodemailer');

const { resetPasswordEmail } = require('../helpers/htmlMails/reset-password');

// Load models
const User = require('../models/User');
const Profile = require('../models/Profile');
const Permission = require('../models/Permission');
const Organization = require('../models/Organization');

///  Mapping for Role-Permission
const rolesToPermission = {
    //rolesToPermission["USER"]
    "USER": ["canRead"],
    "CLIENT": ["canRead","canWrite","canSubmit"],
    "PARTNER": ["canWrite","canUpdate","canRead","canSubmit"],
    "STAFF": ["canCreate","canWrite","canUpdate","canRead","canSubmit"],
    "ADMIN": ["canRead", "canCreate", "canWrite", "canUpdate", "canDelete", "canSubmit", "canAddUser", "canEditUser", "canViewUser", "canDeleteUser"]
};

const domain_regex = new RegExp("(?<=@)[^.]+.*$");

// @route POST api/users/register
// @desc Register user
// @access Public
exports.postRegister = async (req, res) => {
  const {
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName
  } = req.body;

  if (!password || !email || !firstName || !lastName) {
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

  const r = req.body.email.match(domain_regex);
  let domain = email;
  let role = Profile.role;
  //// Find domain and save the domain.
  let permission = Profile.permissionRight;
  if (r) {
    domain = r[0];
  }
  //console.log(ROLES);
  //console.log(ROLES.ADMIN);
  //console.log("Before IF DOMAIN");
  //console.log(permission);

  const userPermission = Profile.findOne({ domain: domain }).then(domain_user => {
    if (!domain_user) {
      role = "ADMIN";
      permission = [
        "canRead",
        "canCreate",
        "canUpdate",
        "canDelete",
        "canAddUser",
        "canEditUser",
        "canViewUser",
        "canDeleteUser"
      ];
    }
  });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        email: 'User already exists',
      });
    }

    const user = await new User({
      email,
      password,
    });
    await user.save();

    let profile = await new Profile({
      user: user.id,
      email,
      lastName,
      firstName,
      domain,
      role,
      permissionRight: permission
    }).save();

    let organization = await new Organization({
        name: domain,
    });
    organization.users.push(user.id);
    await organization.save();

    const userPermission = await new Permission({
      profile: profile._id,
      organization: organization._id,
      role: role.toLowerCase()
    });
    await userPermission.save();

    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: 'Your user have been created'
      },
    });
  } catch (error) {
    //logger.error(error);
    console.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server Error: Please try again'
      },
    });
  }
};

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log(validator.isEmpty(password, { ignore_whitespace: true }));

  if (!password || !email) {
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
    const user = await User.findOne({ email });
    //const role = user.role;
    if (!user) {
      return res.status(422).json({ email: 'User does not exists' });
    }

    const matched = await user.hasSamePassword(password);

    if (!matched) {
      return res.status(422).json({
        password: 'Wrong password',
      });
    }

    const profile = await Profile.findOne({ user });
    if (profile.firstLogin) await profile.updateOne({ firstLogin: false });

    const token = jwt.sign(
      {
        userId: user.id,
        profileId: profile.id,
        role: profile.role,
        permission: profile.permissionRight
      },
      keys.secretOrKey,
      { expiresIn: '30d' },
    );

    return res.json({
      success: true,
      token: `Bearer ${token}`,
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

// @route POST api/users/adduser
// @desc Add new user
// @access Private
exports.postAddUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    role,
    password
  } = req.body;

  if (!password || !email || !firstName || !lastName) {
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

  if (password.length < 6) {
    return res.status(422).json({
      password: 'Password must be at least 6 characters',
    });
  }

  const header = req.headers['authorization'];
  let userId = null;
  let userRole = null;
  let profileId = null;
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    console.log("Token received is " + token);
    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          error: 'Token is invalid and expired'
        });
      }
      console.log("userId received from token is " + decoded.userId);
      userId = decoded.userId;
      userRole = decoded.role;
      profileId = decoded.profileId;
    });
  } else {
    return res.status(403).json({
      alert: {
        title: 'Error!',
        detail: 'Authorization token not found'
      }
    });
  }

  console.log("Token : UserId " + userId);
  console.log("Token : UserRole " + userRole);
  console.log("Token : ProfileId " + profileId);

  if (userId && userRole !== "ADMIN") {
    // throw error
    return res.status(403).json({
      alert: {
        title: 'Error!',
        detail: 'Unauthorized to add user'
      }
    });
  }
try {
  const adminProfile = await Profile.findById(profileId);
  const adminDomain = adminProfile.domain;
  const adminOrganization = await Organization.findOne({name: adminDomain});
  if (!adminOrganization) {
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Organization not found'
      }
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

  if (role === "ADMIN" || role === "STAFF" || role === "USER") {
      if (userDomain !== adminDomain) {
        return res.status(403).json({
          alert: {
            title: 'Error!',
            detail: userId + " with role " + userRole + " should have same domain"
          }
        });
      }
  }

  const user = await new User({
    email,
    password,
  }).save();

  let profile = await new Profile({
    user: user.id,
    email,
    lastName,
    firstName,
    domain: adminDomain,
    role,
    permissionRight: rolesToPermission[role.toUpperCase()]
  }).save();

  adminOrganization.users.push(user.id);
  adminOrganization.save();

  if (adminOrganization.id) {
    const userPermission = await new Permission({
      profile: profile.id,
      organization: adminOrganization.id,
      role: role.toLowerCase()
    });
    await userPermission.save();
  }

  return res.json({
    success: true,
    alert: {
      title: 'Success!',
      detail: 'New User Is Created'
    },
  });
}catch (error) {
    console.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server Error: Please try again'
      }
    });
  }
};

// @route   DELETE api/users/deleteUser
// @desc    Delete User
// @access  Public
exports.deleteUser = async (req, res) => {
  const {
    permissionIds
  } = req.body;
  console.log(permissionIds);
  const header = req.headers['authorization'];
  let adminUserId = null;
  let adminUserRole = null;
  let adminProfileId = null;
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    console.log("Token received is " + token);
    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          error: 'Token is invalid and expired'
        });
      }
      console.log("userId received from token is " + decoded.userId);
      adminUserId = decoded.userId;
      adminUserRole = decoded.role;
      adminProfileId = decoded.profileId;
    });
  } else {
    return res.status(403).json({
      alert: {
        title: 'Error!',
        detail: 'Authorization token not found'
      }
    });
  }

  console.log("Token : UserId " + adminUserId);
  console.log("Token : UserRole " + adminUserRole);
  console.log("Token : ProfileId " + adminProfileId);

  if (adminUserId && adminUserRole !== "ADMIN") {
    // throw error
    return res.status(403).json({
      alert: {
        title: 'Error!',
        detail: 'Unauthorized to add user'
      }
    });
  }
  try {
    permissionIds.forEach(async function (permissionId) {
      const permission = await Permission.findById(permissionId);
      const profileId = permission.profile;
      const organizationId = permission.organization;

      const profile = await Profile.findById(profileId);
      const organization = await Organization.findById(organizationId);
      const userId = profile.user;

      console.log(" Permission Id " + permissionId);
      console.log(" Profile Id " + profileId);
      console.log(" Organization Id " + organizationId);
      console.log(" User Id " + userId);

      if (userId !== adminUserId && profile.role !== adminUserRole) {
        console.log("Delete user " + profile.email);
        User.findOneAndRemove(userId);
        User.remove({_id: userId}, function(err,removed) {
          if (!err) {
            console.log(userId + " is removed");
            console.log(removed);
          }
        });
        Profile.findOneAndRemove(profileId);
        Profile.remove({_id: profileId}, function(err,removed) {
          if (!err) {
            console.log(profileId + " is removed");
            console.log(removed);
          }
        });
        Permission.findOneAndRemove(permissionId);
        Permission.remove({_id: permissionId}, function(err,removed) {
          if (!err) {
            console.log(permissionId + " is removed" );
            console.log(removed);
          }
        });
        organization.users.pull(userId);
        organization.save();
      } else {
        console.log("Cannot delete admin user " + profile.email);
      }
    });

    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: 'User are Deleted'
      },
    });
  }catch (error) {
    console.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server Error: Please try again'
      }
    });
  }
};


// @route GET api/users/:id
// @desc Return current user
// @access Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });

    return res.json({
      success: true,
      profile,
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

// @route POST api/users/reset-password
// @desc Reset password
// @access Public
exports.postResetPassword = async (req, res) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(422).json({
      email: 'Invalid Email',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ email: 'User does not exists' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email,
      },
      keys.secretOrKey,
      { expiresIn: '1h' },
    );

    user.confirmToken = token;

    await user.save();

    const mailOptions = {
      from: '"iAuto" <iauto.iradardata@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Password Reset', // Subject line
      html: resetPasswordEmail('localhost:3000', token), // html body
    };

    try {
      nodeMailer(mailOptions);
    } catch (error) {
      logger.error(error);
      return res.status(422).json({
        alert: {
          title: 'Error!',
          detail: 'An error occurred while sending password reset',
        },
      });
    }

    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: "We've sent an email to reset password",
      },
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

// @route   PUT api/users/reset-password
// @desc    Reset password
// @access  Public
exports.putResetPassword = async (req, res) => {
  const { confirmToken, password, passwordConfirmation } = req.body;

  try {
    const user = await User.findOne({ confirmToken });

    if (!user || !user.confirmToken) {
      return res.status(422).json({
        alert: {
          title: 'Error!',
          detail: 'Token has expired',
        },
      });
    }

    try {
      await jwt.verify(confirmToken, keys.secretOrKey);
    } catch (error) {
      logger.error(error);
      return res.status(422).json({
        alert: {
          title: 'Error!',
          detail: 'Token has expired',
        },
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

    user.password = password;
    user.confirmToken = undefined;

    await user.save();
    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: 'Password has been reset',
      },
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
