const nodemailer = require('nodemailer');
const email = require('../configs/keys').email;
const emailPassword = require('../configs/keys').emailPassword;

const nodeMailer = async (mailOptions) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: email,
      pass: emailPassword,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail(mailOptions);
};

module.exports = nodeMailer;
