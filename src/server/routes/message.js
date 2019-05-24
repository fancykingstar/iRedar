const messageController = require('../controllers/message');

exports.connect = (socket) => {
  socket.on('get-messages', (data) => {
    messageController.index(data, socket);
  });
  
  socket.on('send-message', (data) => {
    messageController.create(data, socket);
  });
  
  socket.on('delete-message', (data) => {
    messageController.delete(data, socket);
  });
};
