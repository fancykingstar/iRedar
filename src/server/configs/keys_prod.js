module.exports = {
  mongoURI: process.env.MONGO_URI,
  testDB: '',
  secretOrKey: process.env.SECRET_OR_KEY,
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  infoEmail: 'info@iradardata.com',
  infoEmailPassword: '1nfoD4t4*',
  stripe: {
    publishable_key: 'pk_test_4fDaBtOFHufm0tSbCvsqsfjR00kRisY7Sg',
    secret_key: 'sk_test_P4tkJKy7NrS0JAk3SA36lWfw00B3TazSEA',
    product: 'prod_FClDOv1JvMnOJq'
  }
};
