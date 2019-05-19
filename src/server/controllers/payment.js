const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');

// Load models
const User = require('../models/User');
const Profile = require('../models/Profile');
const Permission = require('../models/Permission');
const Organization = require('../models/Organization');

const stripeLibrary = require('../helpers/stripeSubscription');

exports.postPayment = async (req, res) => {
    const {
        cardHolderName,
        email,
        phone,
        street1,
        street2,
        city,
        state,
        zipcode,
        country,
        source
    } = req.body;

    const header = req.headers['authorization'];
    let tokenUserId = null;
    let tokenUserRole = null;
    let tokenProfileId = null;
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, keys.secretOrKey, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    error: 'Token is invalid and expired'
                });
            }
            tokenUserId = decoded.userId.toString();
            tokenUserRole = decoded.role.toString();
            tokenProfileId = decoded.profileId.toString();
        });

        console.log("tokenUserId : " + tokenUserId);
        console.log("tokenUserRole : " + tokenUserRole);
        console.log("tokenProfileId : " + tokenProfileId);

        if (tokenUserRole === "admin") {
            const permission = await Permission.findOne({profile: tokenProfileId});
            let organization = await Organization.findOne({_id: permission.organization});

            organization.billing.cardHolderName = cardHolderName;
            organization.billing.email = email;
            organization.billing.phone = phone;
            organization.billing.address.street1 = street1;
            organization.billing.address.street2 = street2;
            organization.billing.address.city = city;
            organization.billing.address.state = state;
            organization.billing.address.country = country;
            organization.billing.address.zipcode = zipcode;
            organization.billing.stripeSource = source;
            await organization.save();
            await stripeLibrary.doUpdatePayment(tokenProfileId, source);
        } else {
            return res.status(403).json({
                alert: {
                    title: 'Error!',
                    detail: 'User not authorization to make payment'
                }
            });
        }

        return res.json({
            success: true,
            alert: {
                title: 'Success!',
                detail: 'Payment information updated successfully'
            },
        });

    } else {
        return res.status(403).json({
            alert: {
                title: 'Error!',
                detail: 'Authorization token not found'
            }
        });
    }
};

exports.changePlan = async (req, res) => {
    const {
        plan
    } = req.body;

    const header = req.headers['authorization'];
    let tokenUserId = null;
    let tokenUserRole = null;
    let tokenProfileId = null;
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, keys.secretOrKey, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    error: 'Token is invalid and expired'
                });
            }
            tokenUserId = decoded.userId.toString();
            tokenUserRole = decoded.role.toString();
            tokenProfileId = decoded.profileId.toString();
        });

        console.log("tokenUserId : " + tokenUserId);
        console.log("tokenUserRole : " + tokenUserRole);
        console.log("tokenProfileId : " + tokenProfileId);
        console.log("new plan : " + plan);

        if (tokenUserRole === "admin") {
            console.log("Change subscription ...")
            // await stripeLibrary.doUnsubscribe(tokenProfileId);
        }
        return res.json({
            success: true,
            alert: {
                title: 'Success!',
                detail: 'Subscription information changed successfully'
            },
        });

    } else {
        return res.status(403).json({
            alert: {
                title: 'Error!',
                detail: 'Authorization token not found'
            }
        });
    }
};

exports.deletePaymentAndSubscription = async (req, res) => {
    const header = req.headers['authorization'];
    let tokenUserId = null;
    let tokenUserRole = null;
    let tokenProfileId = null;
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, keys.secretOrKey, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    error: 'Token is invalid and expired'
                });
            }
            tokenUserId = decoded.userId.toString();
            tokenUserRole = decoded.role.toString();
            tokenProfileId = decoded.profileId.toString();
        });

        console.log("tokenUserId : " + tokenUserId);
        console.log("tokenUserRole : " + tokenUserRole);
        console.log("tokenProfileId : " + tokenProfileId);

        if (tokenUserRole === "admin") {
            console.log("Delete subscription ...")
            // await stripeLibrary.doUnsubscribe(tokenProfileId);
        }

        return res.json({
            success: true,
            alert: {
                title: 'Success!',
                detail: 'Subscription and Payment information deleted successfully'
            },
        });

    } else {
        return res.status(403).json({
            alert: {
                title: 'Error!',
                detail: 'Authorization token not found'
            }
        });
    }
};