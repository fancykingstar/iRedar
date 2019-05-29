const Inbox = require('../models/Inbox');
const Message = require('../models/Message');

const sockets = {};

sockets.index = async ({userId}, socket) => {
  const response = await Inbox.find({from: userId});
  
  socket.emit(`inbox/${userId}`, response);
};

sockets.create = async (data, socket) => {
  const response = await Inbox.create(data);
  
  socket.emit(`inbox/${response._id}`, response);
};

sockets.send = async (data, socket) => {
  const {message, inboxId, userId} = data;
  
  await Message.create({
    message,
    inboxId
  });
  
  sockets.show({
    _id: inboxId,
    userId
  });
};

sockets.show = async ({_id, userId}, socket) => {
  const response = await Inbox.findOne({
    _id,
    from: userId
  }).populate('messages');
  
  socket.emit(`inbox/${_id}/messages`, response);
};

sockets.delete = async ({_id, userId}, socket) => {
  await Inbox.remove({_id});
  
  sockets.index({userId}, socket);
};

module.exports = sockets;
