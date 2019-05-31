let initSocket = null;

exports.init = (socket) => {
  initSocket = socket;
  console.log('a user connected');
};

exports.socket = (event, data) => {
  console.log(data);
  initSocket.emit(`${event}/${data}`, { result: true });
};
