const express = require('express')
const router = express.Router()

const uploadedFormController = require('../controllers/uploadedForm')

router.post(
  '/',
  uploadedFormController.postUploadedForm
)

router.get(
  '/',
  uploadedFormController.getAllUploadedForms,
)

module.exports = router