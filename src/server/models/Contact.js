const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
<<<<<<< HEAD
    emailFor: {
        type: String,
        required: 'Email for field is required'
    },
    emailAddress: {
        type: String,
        required: 'Email address field is required'
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

const contactSchema = new mongoose.Schema({
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
    group: {
        type: String,
        required: 'Group field is required'
    },
    profession: {
        type: String,
        required: 'Profession field is required'
    },
    type: {
        type: String,
        required: 'Type field is required'
    },
    language: {
        type: String,
        required: 'Language field is required'
    },
    phoneNumbers: [phoneNumberSchema],
    emailAddresses: [emailSchema],
    addresses: [addressSchema]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
=======
  emailFor: {
    type: String,
    required: 'Email for field is required'
  },
  emailAddress: {
    type: String,
    required: 'Email address field is required'
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
  },
  language: {
    type: String,
    required: 'Language field is required'
  },
  phoneNumbers: [phoneNumberSchema],
  emailAddresses: [emailSchema],
  addresses: [addressSchema]
>>>>>>> cb1d531... feature: display contacts, store contacts
});

module.exports = mongoose.model('Contact', contactSchema);
