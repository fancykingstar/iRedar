const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  emailFor: {
    type: String,
    required: 'Email for field is required'
  },
  emailAddress: {
    type: String,
    required: 'Email address field is required'
  },
  inviteStatus: {
    type: String,
    default: 'noaccess'
  }
});

const phoneNumberSchema = new mongoose.Schema({
  phoneNumberFor: {
    type: String,
    required: 'Phone number for field is required'
  },
  phoneNumber: {
    type: String,
    required: 'Phone number field is required'
  }
});

const addressSchema = new mongoose.Schema({
  addressFor: {
    type: String,
    required: 'Address for field is required'
  },
  address: {
    type: String,
    required: 'Address field is required'
  },
  city: {
    type: String,
    required: 'City field is required'
  },
  state: {
    type: String,
    required: 'State field is required'
  },
  zipCode: {
    type: String,
    required: 'Zip code field is required'
  },
  country: {
    type: String,
    required: 'Country field is required'
  }
});

const contactSchema = new mongoose.Schema(
  {
    avatar: {
      type: String
    },
    firstName: {
      type: String,
      required: 'First Name field is required'
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
      type: [ String ],
      required: 'Type field is required'
    },
    language: {
      type: String,
      required: 'Language field is required'
    },
    notes: {
      type: String
    },
    groups: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
      }
    ],
    phoneNumbers: [ phoneNumberSchema ],
    emailAddresses: [ emailSchema ],
    addresses: [ addressSchema ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('Contact', contactSchema);
