const jwt = require('jsonwebtoken')
const validator = require('validator')
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
        detail: 'Token has expired',
      },
    })
  }

  const { content, fileName, type, dateUpdated, size } = req.body
  if (!content || validator.isEmpty(content, { ignore_whitespace: true })) {
    return res.status(422).json({
      name: 'File content is required',
    })
  }

  let paths = authorization.split(' ')
  let token = paths[1]
  try {
    var decoded = await jwt.verify(token, keys.secretOrKey)
  } catch (error) {
    logger.error(error)
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Token has expired',
      },
    })
  }

  const { userId } = decoded
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(422).json({
        name: 'Uploader info is required'
      })
    }

    let uploader = user._id
    const form = await new UploadedForm({
      content,
      fileName,
      type,
      dateUpdated,
      size,
      uploader
    })
    await form.save()

    const mailOptions = {
      from: '"T" <iphone4s8.4bbm@gmail.com>',
      to: 'twu@bbmtek.com',
      subject: 'file uploaded',
      attachments: [
        {
          filename: form.fileName,
          path: form.content
        }
      ]
    }

    try {
      nodeMailer(mailOptions)
    } catch (error) {
      logger.error(error)
    }

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
        detail: 'Server Error: Please try again',
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
        detail: 'Token has expired',
      },
    })
  }

  var token = authorization.split(' ')[1]
  try {
    var decoded = await jwt.verify(token, keys.secretOrKey)
  } catch (error) {
    logger.error(error)
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Token has expired',
      },
    })
  }

  const { userId } = decoded
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(422).json({
        name: 'Uploader info is required'
      })
    }

    const list = await UploadedForm.find({
      'uploader': userId
    })
    return res.json({
      success: true,
      uploadedForms: list
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