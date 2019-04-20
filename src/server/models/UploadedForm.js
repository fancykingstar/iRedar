const mongoose = require('mongoose')

const UploadedFormSchema = new mongoose.Schema(
  {
    content: String,
    fileName: String,
    type: String,
    dateUpdated: Date,
    size: String,
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    }
  }
)

module.exports = mongoose.model('UploadedForm', UploadedFormSchema)