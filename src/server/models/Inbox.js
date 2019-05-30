const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inboxSchema = new Schema({
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile'
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile'
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

module.exports = mongoose.model('Inbox', inboxSchema);
