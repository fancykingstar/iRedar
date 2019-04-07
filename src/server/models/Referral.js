const mongoose = require('mongoose')
const Schema = mongoose.Schema

const referralSchema = Schema({
    formName: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    province: {
        type: String,
    },
    city: {
        type: String,
    },
    workExperience: {
        type: String,
    },
    note: {
        type: String,
    },
    dateSubmitted: {
        type: Date,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
    receivers: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    }],
})

module.exports = mongoose.model('Referral', referralSchema)