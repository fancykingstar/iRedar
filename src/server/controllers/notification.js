const Notification = require('../models/Notification');

/**
 * @description Get the list of notifications
 * @returns {res}
 */
exports.index = async (req, res) => {
  let response = await Notification.find().populate('sentBy');
  
  return res.json({
    success: true,
    data: response
  });
};

/**
 * @description Store new notification resource
 * @returns {res}
 */
exports.store = async (req, res) => {
  let {body} = req;
  
  const response = await Notification.create(body);
  
  return res.json({
    success: true,
    data: response
  });
};

/**
 * @description Get the notification resource
 * @returns {res}
 */
exports.edit = async (req, res) => {
  const {id} = req.params;
  
  const response = await Notification.findOne({_id: id}).populate('recipients').populate('sentBy');
  
  return res.json({
    success: true,
    data: response
  });
};

/**
 * @description Update the notification resource
 * @returns {res}
 */
exports.update = async (req, res) => {
  const {id} = req.params;
  
  const response = await Notification.findByIdAndUpdate(id, req.body);
  
  return res.json({
    success: true,
    data: {
      _id: response._id
    }
  });
};

/**
 * @description Delete the notification resource
 * @returns {res}
 */
exports.delete = async (req, res) => {
  const {ids} = req.query;
  
  const response = await Notification.deleteMany({_id: {$in: ids}});
  
  return res.json({
    success: true,
    data: response
  });
};
