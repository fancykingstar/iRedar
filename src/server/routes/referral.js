const express = require('express')
const passport = require('passport');
const router = express.Router()

const referralController = require('../controllers/referral')

router.get(
    '/:profileId',
    passport.authenticate('jwt', { session: false }),
    referralController.getAllReferrals
)

router.get(
    '/referrals/:referralId',
    passport.authenticate('jwt', { session: false }),
    referralController.getReferral
)

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    referralController.postReferral
)

module.exports = router