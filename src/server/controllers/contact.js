const Contact = require('../models/Contact');

/**
 * @description Get the list of contacts
 * @returns {res}
 */
exports.index = async (req, res) => {
  let contacts = await Contact.find().populate('groups');
  
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
  let {body} = req;
  console.log(body);
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
  const {id} = req.params;
  
  const contact = await Contact.findOne({_id: id}).populate('groups');
  
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
  const {id} = req.params;
  
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
  const {ids} = req.query;
  
  const contact = await Contact.deleteMany({_id: {$in: ids}});
  
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
  const {id} = req.params;
  
  const response = await Contact.findByIdAndUpdate(id, req.body);
  
  return res.json({
    success: true,
    data: {
      _id: response._id
    }
  });
};
