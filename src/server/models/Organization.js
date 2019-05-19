const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
      {
        type: mongoose.Schema.ObjectId,
          ref: "User"
      }
  ],
  email: {
    type: String,
    //required: true,
  },
  domain: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
      required: true,
  },
  address: {
    street: {
      type: String,
      //required: true,
    },
    city: {
      type: String,
      //required: true,
    },
    province: {
      type: String,
      //required: true,
    },
    country: {
      type: String,
     // required: true,
    },

    postalCode: {
      type: String,
     // required: true,
    },
  },
  stripe: {
    stripeAdminCustomerId: {
      type: String,
    },
    stripeSubscriptionPlanId: {
      type: String,
    },
    stripePlanId: {
      type: String,
    },
    stripeAdminCustomerToken: {
      type: String,
    },
    plan: {
      type: String,
    },
    interval: {
      type: String,
    }
  },
    billing: {
        cardHolderName: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            street1: {
                type: String,
            },
            street2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipcode: {
                type: String,
            },
            country: {
                type: String,
            }
        },
        stripeSource: {
            type: String,
        }
    }
});

module.exports = mongoose.model('Organization', OrganizationSchema);
