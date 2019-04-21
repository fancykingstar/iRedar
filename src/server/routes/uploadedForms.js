const express = require('express')
const passport = require('passport');

const router = express.Router()

const uploadedFormController = require('../controllers/uploadedForm')

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    uploadedFormController.postUploadedForm
)

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    uploadedFormController.getAllUploadedForms
)

module.exports = router