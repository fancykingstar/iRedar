const jwt = require('jsonwebtoken');
const validator = require('validator');
const keys = require('../configs/keys');
const logger = require('../configs/logger');
const nodeMailer = require('../helpers/nodemailer');
const stripeLibrary = require('../helpers/stripeSubscription');

const { resetPasswordEmail } = require('../helpers/htmlMails/reset-password');

// Load models
const User = require('../models/User');
const Profile = require('../models/Profile');
const Permission = require('../models/Permission');
const Organization = require('../models/Organization');

///  Mapping for Role-Permission
const rolesToPermission = {
  "user": ["canRead"],
  "client": ["canRead", "canWrite", "canSubmit"],
  "partner": ["canWrite", "canUpdate", "canRead", "canSubmit"],
  "staff": ["canCreate", "canWrite", "canUpdate", "canRead", "canSubmit"],
  "admin": ["canRead", "canCreate", "canWrite", "canUpdate", "canDelete", "canSubmit", "canAddUser", "canEditUser", "canViewUser", "canDeleteUser"]
};

const domain_regex = new RegExp("(?<=@)[^.]+.*$");

// @route POST api/users/register/client
// @desc Register user
// @access Public
exports.postClientRegister = async (req, res) => {
  const {
    email,
    password,
    passwordConfirmation,
    phone,
    firstName,
    lastName
  } = req.body;

  if (!password || !email || !firstName || !lastName || !phone) {
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

  const r = email.match(domain_regex);
  let userDomain = email;
  if (r) {
    userDomain = r[0];
  }

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
      phoneNumber: phone,
      domain: userDomain
    }).save();

    const userPermission = await new Permission({
      profile: profile._id,
      role: "client",
      permissionRight: rolesToPermission["client"]
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
    const permission = await Permission.findOne({profile});
    if (user.firstLogin) await user.updateOne({firstLogin: false});

    const token = jwt.sign(
      {
        userId: user.id,
        profileId: profile.id,
        role: permission.role,
        permission: permission.permissionRight
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

// @route POST api/users/register/user
// @desc Add new user
// @access Private
exports.postRegister = async (req, res) => {
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
    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          error: 'Token is invalid and expired'
        });
      }
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

  if (userId && userRole !== "admin") {
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
  const adminOrganization = await Organization.findOne({domain: adminDomain});
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

  if (role === "admin" || role === "staff" || role === "user") {
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
    domain: adminDomain
  }).save();

  adminOrganization.users.push(user.id);
  adminOrganization.save();

  if (adminOrganization.id) {
    const userPermission = await new Permission({
      profile: profile.id,
      organization: adminOrganization.id,
      role: role,
      permissionRight: rolesToPermission[role]
    });
    await userPermission.save();
  }

    await stripeLibrary.doUpdateSubscription(adminProfile._id);

  return res.json({
    success: true,
    alert: {
      title: 'Success!',
      detail: 'New User Is Created'
    },
  });
}catch (error) {
    console.error(error);
  console.log(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server Error: Please try again'
      }
    });
  }
};

// @route   PUT api/users/updateUser
// @desc    Update User information by user himself / herself
// @access  Public

exports.putUpdateUser = async (req, res) => {
  const {
    profileId,
    permissionId,
    lastName,
    firstName,
    email,
    phoneNumber
  } = req.body;

  const header = req.headers['authorization'];
  let tokenUserId = null;
  let tokenUserRole = null;
  let tokenProfileId = null;
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          error: 'Token is invalid and expired'
        });
      }
      tokenUserId = decoded.userId.toString();
      tokenUserRole = decoded.role.toString();
      tokenProfileId = decoded.profileId.toString();
    });

    let userProfileId = profileId;
    if (!userProfileId) {
      const permission = await Permission.findById(permissionId);
      userProfileId = permission.profile.toString();
    }
    if (tokenUserRole !== "admin" && userProfileId !== tokenProfileId) {
      return res.status(403).json({
        error: 'User does not have rights to change other person profile'
      });
    }

    let data = {};
    if (lastName) {
      data["lastName"] = lastName;
    }
    if (firstName) {
      data["firstName"] = firstName;
    }
    if (phoneNumber) {
      data["phoneNumber"] = phoneNumber;
    }
    if (email) {
      data["email"] = email;
    }
    await Profile.findOneAndUpdate(
        {_id: userProfileId},
        {$set: data}
    );

    if (email) {
      const profile = await Profile.findOne({ "_id" : userProfileId});
      if (profile) {
        await User.findOneAndUpdate(
            {_id: profile.user},
            {$set: {'email': email}}
        );
      }
    }

      // update admin for stripe
      if (tokenUserRole === "admin" && userProfileId === tokenProfileId) {
          await stripeLibrary.doUpdateAdminCustomer(userProfileId, firstName, lastName, email, phoneNumber);
      }

  } else {
    return res.status(403).json({
      alert: {
        title: 'Error!',
        detail: 'Authorization token not found'
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
  const header = req.headers['authorization'];
  let adminUserId = null;
  let adminUserRole = null;
  let adminProfileId = null;
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    jwt.verify(token, keys.secretOrKey, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          error: 'Token is invalid and expired'
        });
      }
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

  if (adminUserId && adminUserRole !== "admin") {
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

      if (userId !== adminUserId && profile.role !== adminUserRole) {
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

          await stripeLibrary.doUpdateSubscription(adminProfileId);
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
        userId: user._id,
        email,
      },
      keys.secretOrKey,
      { expiresIn: '1h' },
    );

    user.confirmToken = token;
    await user.save();

    const mailOptions = {
      //from: '"iAuto" <iauto.iradardata@gmail.com>', // sender address
      from: keys.infoEmail,
      to: email, // list of receivers
      subject: 'Password Reset', // Subject line
      html: resetPasswordEmail('localhost:5000', token), // html body
    };

    nodeMailer(mailOptions, keys.infoEmail, keys.infoEmailPassword).then(() => {
      res.json({
        success: true,
        alert: {
          title: 'Success!',
          detail: "We've sent an email to reset password",
        },
      });
    }).catch((error) => {
      console.log("ERROR ==> ");
      console.log(error);
      res.status(422).json({
        success: false,
        alert: {
          title: 'Error!',
          detail: "We've not sent an email to reset password",
        },
      });
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      success: false,
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
  const { passwordCurrent, password, passwordConfirmation } = req.body;
  const {confirmToken} = req.body;
  try {
    const header = req.headers['authorization'];
    let tokenUserId = null;
    let tokenUserRole = null;
    let tokenProfileId = null;
    if (confirmToken !== undefined) {
      jwt.verify(confirmToken, keys.secretOrKey, function (err, decoded) {
        if (err) {
          return res.status(403).json({
            error: 'Token is invalid and expired'
          });
        }
        tokenUserId = decoded.userId.toString();
      });
      const user = await User.findById(tokenUserId);
      const matched = await user.hasSameConfirmToken(confirmToken);
      if (matched) {
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
        delete user.confirmToken;
        await user.save();
      }
      return res.json({
        success: true,
        alert: {
          title: 'Success!',
          detail: 'Password has been reset',
        },
      });
    } else if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      jwt.verify(token, keys.secretOrKey, function (err, decoded) {
        if (err) {
          return res.status(403).json({
            error: 'Token is invalid and expired'
          });
        }
        tokenUserId = decoded.userId.toString();
        tokenUserRole = decoded.role.toString();
        tokenProfileId = decoded.profileId.toString();
      });

      const user = await User.findById(tokenUserId);
      const matched = await user.hasSamePassword(passwordCurrent);
      if (matched) {
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
        await user.save();
      }
      return res.json({
        success: true,
        alert: {
          title: 'Success!',
          detail: 'Password has been reset',
        },
      });
    } else {
      return res.status(403).json({
        alert: {
          title: 'Error!',
          detail: 'Authorization token not found'
        }
      });
    }
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