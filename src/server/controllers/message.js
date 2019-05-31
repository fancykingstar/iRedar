const Inbox = require('../models/Inbox');
const Message = require('../models/Message');
const Socket = require('./sockets');

/**
 * @description Store new message
 * @returns {res}
 */
exports.postMessage = async (req, res) => {
  const { inboxId, message, to, from, sentBy } = req.body;

  if (!inboxId) {
    let inbox = new Inbox({ from: from, to: to, messages: [] });
    inbox.save(function (err) {
      if (err) console.log(err);

      let messageObject = new Message({
        inboxId: inbox._id,
        message: message,
        sentBy: sentBy
      });

      messageObject.save(function (err) { if (err) console.log(err); });
      inbox.messages.push(messageObject);
      inbox.save();

      Socket.socket('has-new-conversation', messageObject.inboxId);

      return res.json({
        success: true,
        data: inbox
      });
    });

  } else {
    const inbox = await Inbox.findById(inboxId);

    let messageObject = new Message({
      inboxId: inboxId,
      message: message,
      sentBy: sentBy
    });

    messageObject.save();
    inbox.messages.push(messageObject);
    inbox.save();

    Socket.socket('has-new-message', inboxId);
    // // include socket to response.then()

    return res.json({
      success: true,
      data: inbox
    });
  }
};

/**
 * @description Get list of messages
 * @returns {res}
 */
exports.getMessages = async (req, res) => {
  let { inboxId } = req.params;

  const response = await Message.find({ inboxId: inboxId });

  return res.json({
    success: true,
    data: response
  });
};