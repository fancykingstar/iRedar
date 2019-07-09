const Inbox = require('../models/Inbox');

/**
 * @description Get list of Inbox
 * @returns {res}
 */
exports.index = async (req, res) => {
  let { id } = req.params;
  let inboxes = await Inbox.find({ $or: [{ to: id }, { from: id }] }).populate(['to', 'from']);
  // populate later with last message sent to display last message sent on the side
  
  return res.json({
    success: true,
    data: inboxes
  });
};

/**
 * @description Get inbox
 * @returns {res}
 */
exports.getInbox = async (req, res) => {
  let { inboxId } = req.params;
  
  let inbox = await Inbox.findOne({ _id: inboxId }).populate(['messages', 'to', 'from']);
  
  return res.json({
    success: true,
    data: inbox
  });
};

/**
 * @description Delete inbox
 * @returns {res}
 */
exports.deleteInbox = async (req, res) => {
  let { inboxId } = req.params;
  let inboxes = await Inbox.findOne({_id: inboxId}).remove();
  return res.json({
    success: true,
    data: inboxes
  });
};
