const jwt = require('jsonwebtoken')
const keys = require('../configs/keys')
const logger = require('../configs/logger')

// Load models
const User = require('../models/User')
const Profile = require('../models/Profile')
const Referral = require('../models/Referral')

exports.getAllReferrals = async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(422).json({
            alert: {
                title: 'Error!',
                detail: 'Server occurred an error,  please try again',
            },
        })
    }

    let token = authorization.split(' ')[1]
    try {
        var decoded = await jwt.verify(token, keys.secretOrKey)
        const { userId } = decoded
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
            ]).populate('sender')
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

exports.postReferral = async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(422).json({
            alert: {
                title: 'Error!',
                detail: 'Server occurred an error,  please try again',
            },
        })
    }

    let token = authorization.split(' ')[1]
    try {
        var decoded = await jwt.verify(token, keys.secretOrKey)
        const { userId } = decoded
        const user = await User.findById(userId)
        if (!user) {
            return res.status(422).json({
                name: 'Uploader info is required'
            })
        }
        const {
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
            receivers
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

        let receiverIds = profiles.map(profile => profile._id);

        let referral = new Referral({
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
            receivers: receiverIds
        })
        await referral.save()
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
