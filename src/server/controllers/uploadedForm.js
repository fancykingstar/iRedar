const jwt = require('jsonwebtoken')
const keys = require('../configs/keys')
const logger = require('../configs/logger')
const nodeMailer = require('../helpers/nodemailer')

// Load models
const User = require('../models/User')
const UploadedForm = require('../models/UploadedForm')

exports.postUploadedForm = async (req, res) => {
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

    let attachments = []
    let uploader = user._id
    req.body.forEach(form => {
      const { content, fileName, type, dateUpdated, size } = form
      attachments.push({ fileName, path: content })
      new UploadedForm({
        content,
        fileName,
        type,
        dateUpdated,
        size,
        uploader
      })
        .save()
        .catch((err) => {
          logger(err.message);
        });
    })

    const mailOptions = {
      from: '"Forms" <forms@iradardata.com>',
      to: 'forms@iradardata.com',
      subject: 'file uploaded',
      attachments,
    }
    nodeMailer(mailOptions)

    return res.json({
      success: true,
      alert: {
        title: 'Success!',
        detail: 'Your file have been uploaded'
      }
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

exports.getAllUploadedForms = async (req, res) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    })
  }

  var token = authorization.split(' ')[1]
  try {
    var decoded = await jwt.verify(token, keys.secretOrKey)
    const { userId } = decoded
    const user = await User.findById(userId)
    if (!user) {
      return res.status(422).json({
        name: 'Uploader info is required'
      })
    }

    const uploadedForms = await UploadedForm.find({
      'uploader': userId
    })

    return res.json({
      success: true,
      uploadedForms
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