let initSocket = null;

exports.init = (socket) => {
  initSocket = socket;
  console.log('a user connected');
};

exports.socket = (event, id, data) => {
  initSocket.emit(`${event}/${id}`, { data });
};
