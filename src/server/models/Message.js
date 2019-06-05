const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  inboxId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Inbox'
  },
  message: {
    type: String,
    required: 'Message field is required'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  sentBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Message', messageSchema);
