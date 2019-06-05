const Group = require('../models/Group');

/**
 * @description Get the list of group
 * @returns {res}
 */
exports.index = async (req, res) => {
  const groups = await Group.find();
  
  return res.json({
    success: true,
    data: groups
  });
};

/**
 * @description Store new group resource
 * @returns {res}
 */
exports.store = async (req, res) => {
  let {body} = req;
  
  const group = await Group.create(body);
  
  return res.json({
    success: true,
    data: group
  });
};

/**
 * @description Get the group resource
 * @returns {res}
 */
exports.edit = async (req, res) => {
  const {id} = req.params;
  
  const group = await Group.findOne({_id: id});
  
  return res.json({
    success: true,
    data: group
  });
};

/**
 * @description Update the contact resource
 * @returns {res}
 */
exports.update = async (req, res) => {
  const {id} = req.params;
  
  const response = await Group.findByIdAndUpdate(id, req.body);
  
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
  const {id} = req.params;
  
  const group = await Group.remove({_id: id});
  
  return res.json({
    success: true,
    data: group
  });
};
