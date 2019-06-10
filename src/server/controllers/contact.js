const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const nodeMailer = require('../helpers/nodemailer');

// Load models
const User = require('../models/User');
const Profile = require('../models/Profile');
const Permission = require('../models/Permission');
const Contact = require('../models/Contact');

const { inviteClientPortalMail } = require('../helpers/htmlMails/invite-client-portal');

///  Mapping for Role-Permission
const rolesToPermission = {
  "user": ["canRead"],
  "client": ["canRead", "canWrite", "canSubmit"],
  "partner": ["canWrite", "canUpdate", "canRead", "canSubmit"],
  "staff": ["canCreate", "canWrite", "canUpdate", "canRead", "canSubmit"],
  "admin": ["canRead", "canCreate", "canWrite", "canUpdate", "canDelete", "canSubmit", "canAddUser", "canEditUser", "canViewUser", "canDeleteUser"]
};
const domain_regex = new RegExp("(?<=@)[^.]+.*$");

/**
 * @description Get the list of contacts
 * @returns {res}
 */
exports.index = async (req, res) => {
  const { userId } = req.params;
  let contacts = await Contact.find({created_by: userId}).populate('groups');

  return res.json({
    success: true,
    data: contacts
  });
};

/**
 * @description Store new contact resource
 * @returns {res}
 */
exports.store = async (req, res) => {
  let { body } = req;

  const contact = await Contact.create(body);

  return res.json({
    success: true,
    data: contact
  });
};

/**
 * @description Get the contact resource
 * @returns {res}
 */
exports.edit = async (req, res) => {
  const { id } = req.params;

  let contact = await Contact.findOne({ _id: id }).populate('groups');

  return res.json({
    success: true,
    data: contact
  });
};

/**
 * @description Update the contact resource
 * @returns {res}
 */
exports.update = async (req, res) => {
  const { id } = req.params;
  req.body.updated_at = new Date();
  const response = await Contact.findByIdAndUpdate(id, req.body);

  return res.json({
    success: true,
    data: {
      _id: response._id
    }
  });
};

/**
 * @description Delete the contact resource
 * @returns {res}
 */
exports.delete = async (req, res) => {
  const { ids } = req.query;

  const contact = await Contact.deleteMany({ _id: { $in: ids } });

  return res.json({
    success: true,
    data: contact
  });
};

/**
 * @description Update the contact resource
 * @returns {res}
 */
exports.updatePrivateNotes = async (req, res) => {
  const { id } = req.params;

  const response = await Contact.findByIdAndUpdate(id, req.body);

  return res.json({
    success: true,
    data: {
      _id: response._id
    }
  });
};

/**
 * @description Update the contact resource
 * @returns {res}
 */
exports.uploadProfilePhoto = async (req, res) => {
  const { id } = req.params;
  req.body.updated_at = new Date();
  const response = await Contact.findByIdAndUpdate(id, req.body);

  return res.json({
    success: true,
    data: {
      _id: response._id
    }
  });
};

/**
 * @description Get the list of contacts by filter
 * @returns {res}
 */
exports.filter = async (req, res) => {
  const profession = req.params.profession === 'init' ? '' : req.params.profession
  const company = req.params.company === 'init' ? '' : req.params.company
  const type = req.params.type === 'init' ? '' : req.params.type
  let contacts = await Contact.find({
    profession: {'$regex' : profession, '$options' : 'i'},
    company: {'$regex' : company, '$options': 'i'},
    type: {'$regex' : type, '$options' : 'i'}
  }).populate('groups');

  return res.json({
    success: true,
    data: contacts
  });
};

/**
 * @description Get the list of contacts by filter
 * @returns {res}
 */
exports.inviteClientPortal = async (req, res) => {
  const { inviteData, profileData } = req.body;
  const { email, password} = inviteData;
  const user = await User.findOne({ email });
  
  if (user) {
    return res.json({
      success: true,
      alert: "user already exist"
    });
  } else {
    const newUser = await new User({
      email,
      password,
    });
    await newUser.save();
  
    const r = email.match(domain_regex);
    let userDomain = email;
    if (r) {
      userDomain = r[0];
    }
    let newProfile = {
      ...profileData,
      user: newUser._id,
      domain: userDomain
    }
    let profile = await new Profile(newProfile).save();
    let userPermission = await new Permission({
      profile: profile._id,
      role: inviteData.type,
      permissionRight: rolesToPermission[inviteData.type]
    });
    await userPermission.save().then(() => {
      return res.json({
        success: true
      });
    }).catch(error => {
      console.log(error);
    });  
  }
}

/**
 * @description change Invite access
 * @returns {res}
 */
exports.changeInviteAccess = async (req, res) => {
  const { id } = req.params;
  const { inviteData, baseUrl } = req.body;
  const { email,username } = inviteData;

  const user = await User.findOne({ email });
  const contact = await Contact.findById(id);

  if (!user) {
    return res.status(422).json({ email: 'User not exists' });
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

  contact.emailAddresses.map(item => {
    if (item.emailAddress === email) {
      item.inviteStatus = 'pending';  
    }
    return item;
  });

  const mailOptions = {
    //from: '"iAuto" <iauto.iradardata@gmail.com>', // sender address
    from: keys.infoEmail,
    to: email, // list of receivers
    subject: 'Invite to the Client Access', // Subject line
    html: inviteClientPortalMail(baseUrl, username, keys.infoEmail, token), // html body
  };

  contact.save().then(() => {
    nodeMailer(mailOptions, keys.infoEmail, keys.infoEmailPassword).then(() => {
      res.json({
        success: true,
        alert: {
          title: 'Success!',
          detail: "We've sent an email to invite the client portal",
        },
      });
    }).catch((error) => {
      console.log("ERROR ==> ");
      console.log(error);
      res.status(422).json({
        success: false,
        alert: {
          title: 'Error!',
          detail: "We've not sent an email to invite the client portal",
        },
      });
    });
  }).catch((error) => {
    res.status(422).json({
      success: false,
      alert: {
        title: 'Error!',
        detail: "We've not change invite status",
      },
    });
  });
}

exports.updateInviteAccess = async (req, res) => {
  const { id } = req.params;

  let contact = await Contact.findOne({ _id: id }).populate('groups');
  try{
    Promise.all(contact.emailAddresses.map(async item => {
      if (item.inviteStatus === 'pending') {
        const user = await User.findOne({email: item.emailAddress});
        console.log(user.lastLogin_at)
        if (user.lastLogin_at != null) {
          item.inviteStatus = 'confirmed';
          console.log(item)
        }
      }
      return item;
    })).then(res => {
      contact.emailAddress = res;
      return contact.save();
    }).then(() => res.json({
      success: true,
      data: contact
    }));
    
  } catch(err){
    console.log(err)
  }
}
