const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  sentBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Profile'
  },
  title: {
    type: String,
    required: 'Title field is required'
  },
  message: {
    type: String,
    required: 'Message field is required'
  },
  recipients: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Contact'
    }
  ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
