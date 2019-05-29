const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Message'
    }
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Message', messageSchema);
