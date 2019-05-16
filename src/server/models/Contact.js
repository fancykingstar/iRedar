const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'Firs Name field is required'
  },
  lastName: {
    type: String,
    required: 'Last Name field is required'
  },
  company: {
    type: String,
    required: 'Company field is required'
  },
  profession: {
    type: String,
    required: 'Profession field is required'
  },
  type: {
    type: String,
    required: 'Type field is required'
  },
  group: {
    type: String,
    required: 'Group field is required'
  }
});

module.exports = mongoose.model('Contact', contactSchema);
