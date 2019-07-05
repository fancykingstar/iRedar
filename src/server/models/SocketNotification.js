const mongoose = require('mongoose')
const Schema = mongoose.Schema

const socketnotificationSchema = Schema({
    type: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    sentBy: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    }],
    id: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    }
})

module.exports = mongoose.model('SocketNotification', socketnotificationSchema)