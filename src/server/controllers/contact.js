const Joi = require('@hapi/joi');
const Contact = require('../models/Contact');
const logger = require('../configs/logger');

const rules = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  company: Joi.string().required(),
  profession: Joi.string().required(),
  type: Joi.string().required(),
  group: Joi.string().required()
});

/**
 * @description Get the list of contacts
 * @returns {res}
 */
exports.index = async (req, res) => {
  try {
    let contacts = await Contact.find();

    return res.json({ success: true, data: contacts });
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
exports.store = (req, res) => {
  try {
    Joi.validate(req.body, rules, async (err, value) => {
      if (err) {
        return res.status(422).json({ success: false, data: err });
      }

      const contacts = await Contact(value).save();

      return res.json({ success: true, data: contacts });
    });

  } catch (e) {
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
 * @description Get the contact resource
 * @returns {res}
 */
exports.edit = async (req, res) => {
  const { id } = req.params;

  try {
    let contact = await Contact.findOne({ _id: id });

    return res.json({ success: true, data: contact });
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
exports.update = (req, res) => {
  const { id } = req.params;

  try {
    Joi.validate(req.body, rules, async (error, value) => {
      if (error) {
        return res.status(422).json({ success: false, data: error });
      }

      await Contact.findByIdAndUpdate(id, value, (error, response) => {
        if (error) {
          return res.status(422).json({ success: false, data: error });
        }

        return res.json({
          success: true,
          data: {
            _id: response._id
          }
        });
      });
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
 * @description Delete the contact resource
 * @returns {res}
 */
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    let contact = await Contact.remove({ _id: id });

    return res.json({ success: true, data: contact });
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


