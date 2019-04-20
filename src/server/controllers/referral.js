const jwt = require('jsonwebtoken')
const keys = require('../configs/keys')
const logger = require('../configs/logger')
const nodeMailer = require('../helpers/nodemailer')

// Load models
const User = require('../models/User')
const Profile = require('../models/Profile')
const Referral = require('../models/Referral')

const { referralPreview } = require('../helpers/htmlMails/referral');

exports.getAllReferrals = async (req, res) => {
    try {
        let userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(422).json({
                name: 'Sender info is required'
            })
        }
        let profileId = req.params.profileId
        const referrals = await Referral.find()
            .or([
                { 'sender': profileId },
                { 'receivers': profileId }
            ])
            .populate('sender', 'firstName')
            .populate('receivers', 'firstName')
        return res.json({
            success: true,
            referrals
        })
    } catch (error) {
        logger.error(error)
        return res.status(422).json({
            alert: {
                title: 'Error!',
                detail: 'Server occurred an error,  please try again',
            },
        })
    }
}

exports.getReferral = async (req, res) => {
    try {
        let userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(422).json({
                name: 'Sender info is required'
            })
        }
        let referralId = req.params.referralId
        const referral = await Referral.findById(referralId)
            .populate('sender', 'firstName')
            .populate('receivers', 'firstName')
        return res.json({
            success: true,
            referrals: [referral]
        })
    } catch (error) {
        logger.error(error)
        return res.status(422).json({
            alert: {
                title: 'Error!',
                detail: 'Server occurred an error,  please try again',
            },
        })
    }
}

exports.postReferral = async (req, res) => {
    try {
        let userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(422).json({
                name: 'Uploader info is required'
            })
        }

        const {
            _id,
            formName,
            firstName,
            lastName,
            email,
            address,
            province,
            city,
            workExperience,
            note,
            dateSubmitted,
            sender,
            receivers,
            submissionId
        } = req.body

        let receiverArray = receivers.split(',')
        const profiles = await Profile.find({
            firstName: {
                $in: receiverArray.map(receiver => receiver.trim())
            }
        })
        if (!profiles) {
            return res.json({
                referral: {}
            })
        }
        let receiverIds = profiles.map(profile => profile._id)

        let referral
        if (_id != null) {
            referral = await Referral.findById(_id)
            referral.formName = formName
            referral.firstName = firstName
            referral.lastName = lastName
            referral.email = email
            referral.address = address
            referral.province = province
            referral.city = city
            referral.workExperience = workExperience
            referral.note = note
            referral.dateSubmitted = dateSubmitted
            referral.sender = sender
            referral.receivers = receiverIds
            referral.submission = submissionId
        } else {
            referral = new Referral({
                formName,
                firstName,
                lastName,
                email,
                address,
                province,
                city,
                workExperience,
                note,
                dateSubmitted,
                sender,
                receivers: receiverIds,
                submission: submissionId
            })
        }
        let saved = await referral.save()

        let apiUrl = (process.env.NODE_ENV === "production") ? 'https://iauto.herokuapp.com' : 'http://localhost:5000'
        let maillist = profiles.map(profile => profile.email).join(',')
        const mailOptions = {
            from: '"Forms" <forms@iradardata.com>',
            to: maillist,
            subject: 'new referral',
            html: referralPreview(apiUrl, referral)
        }
        nodeMailer(mailOptions)

        return res.json({
            referral
        })
    } catch (error) {
        logger.error(error)
        return res.status(422).json({
            alert: {
                title: 'Error!',
                detail: 'Server occurred an error,  please try again',
            },
        })
    }
}
