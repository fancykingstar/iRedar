const jwt = require('jsonwebtoken');

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

        const permission = await Permission.findOne({profile: tokenProfileId});
        let organization = await Organization.findOne({_id: permission.organization});
        let user = await User.findOne({_id: profile.user});

        console.log("tokenUserId : " + tokenUserId);
        console.log("tokenUserRole : " + tokenUserRole);
        console.log("tokenProfileId : " + tokenProfileId);
        //await organization

        /*
        let userProfileId = profileId;
        if (!userProfileId) {
            const permission = await Permission.findById(permissionId);
            userProfileId = permission.profile.toString();
        }
        if (tokenUserRole !== "admin" && userProfileId !== tokenProfileId) {
            return res.status(403).json({
                error: 'User does not have rights to change payment information'
            });
        }
        */

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

        /*
        let userProfileId = profileId;
        if (!userProfileId) {
            const permission = await Permission.findById(permissionId);
            userProfileId = permission.profile.toString();
        }
        if (tokenUserRole !== "admin" && userProfileId !== tokenProfileId) {
            return res.status(403).json({
                error: 'User does not have rights to change payment information'
            });
        }
        */

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