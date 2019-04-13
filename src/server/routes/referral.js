const express = require('express')
const router = express.Router()

const referralController = require('../controllers/referral')

router.get('/:profileId', referralController.getAllReferrals)
router.get('/referrals/:referralId', referralController.getReferral)

router.post('/', referralController.postReferral)

module.exports = router