const Joi = require('@hapi/joi');
const Contact = require('../models/Contact');
const logger = require('../configs/logger');

const rules = Joi.object().keys({
  firstName: Joi.string().label('First Name').required(),
  lastName: Joi.string().label('Last Name').required(),
  company: Joi.string().label('Company').required(),
  profession: Joi.string().label('Profession').required(),
  type: Joi.string().label('Type'),
  group: Joi.string().label('Group'),
  language: Joi.string().label('Language'),
  emailAddresses: Joi.array().items(
    Joi.object().keys({
      emailFor: Joi.string().required().label('Email for'),
      emailAddress: Joi.string().email().required().label('Email address')
    })
  ),
  addresses: Joi.array().items(
    Joi.object().keys({
      addressFor: Joi.string().label('Address for'),
      address: Joi.string().required().label('Address'),
      city: Joi.string().required().label('City'),
      state: Joi.string().required().label('State'),
      zipCode: Joi.string().required().label('Zip code'),
      country: Joi.string().required().label('Country')
    })
  ),
  phoneNumbers: Joi.array().items(
    Joi.object().keys({
      phoneNumberFor: Joi.string().required().label('Phone number for'),
      phoneNumber: Joi.string().required().label('Phone number')
    })
  )
});

/**
 * @description Get the list of contacts
 * @returns {res}
 */
exports.index = async (req, res) => {
  try {
    let contacts = await Contact.find();
    
    return res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again'
      }
    });
  }
};

/**
 * @description Store new contact resource
 * @returns {res}
 */
exports.store = async (req, res, next) => {
  try {
    let {body} = req;
    const contact = await Contact.create(body);
    return res.json({
      success: true,
      data: contact
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

/**
 * @description Get the contact resource
 * @returns {res}
 */
exports.edit = async (req, res) => {
  try {
    const {id} = req.params;
    let contact = await Contact.findOne({_id: id});
    
    return res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again'
      }
    });
  }
};

/**
 * @description Update the contact resource
 * @returns {res}
 */
exports.update = async (req, res, next) => {
  try {
    const {id} = req.params;
    const response = await Contact.findByIdAndUpdate(id, req.body);
    return res.json({
      success: true,
      data: {
        _id: response._id
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete the contact resource
 * @returns {res}
 */
exports.delete = async (req, res) => {
  const {ids} = req.query;
  
  try {
    let contact = await Contact.deleteMany({_id: {$in: ids}});
    
    return res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again'
      }
    });
  }
};
