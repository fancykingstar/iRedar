const express = require('express');
const passport = require('passport');

const router = express.Router();

const paymentController = require('../controllers/payment');

// @route POST api/payment/register
// @desc Register organizations
// @access Private
router.post(
    '/register',
    passport.authenticate('jwt', {session: false}),
    paymentController.postPayment,
);

// @route DELETE api/payment/deregister
// @desc Register organizations
// @access Private
router.delete(
    '/deregister',
    passport.authenticate('jwt', {session: false}),
    paymentController.deletePaymentAndSubscription,
);

module.exports = router;