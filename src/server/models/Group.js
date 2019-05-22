const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: 'Group name field is required'
  }
});

module.exports = mongoose.model('Group', groupSchema);
