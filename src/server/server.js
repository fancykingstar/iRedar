const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const logger = require('./configs/logger');

const users = require('./routes/users');
const organizations = require('./routes/organization');
const submissions = require('./routes/submission');
const uploadedForms = require('./routes/uploadedForms');
const referralController = require('./routes/referral');
const contacts = require('./routes/contacts');
const groups = require('./routes/group');
const notifications = require('./routes/notifications');

// eslint-disable no-console

// Initial express app
const app = express();

// Log requests info
app.use(morgan('dev'));

// Handle CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

// Database config
const db = require('./configs/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true}).
  then(() => logger.info('MongoDB connected')).
  catch(err => logger.error(err));
mongoose.set('useCreateIndex', true);

const debugMode = (process.env.NODE_ENV === 'development');
const relativePath = debugMode ? '../../' : '../..';

// Passport Config
app.use(passport.initialize());
require('./configs/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/organizations', organizations);
app.use('/api/submissions', submissions);
app.use('/api/upload-forms', uploadedForms);
app.use('/api/upload-referral', referralController);
app.use('/api/contacts', contacts);
app.use('/api/groups', groups);
app.use('/api/notifications', notifications);

if (!debugMode) {
  app.use(express.static(path.join(__dirname, relativePath, 'build')));
}

app.use(require('./helpers/error-handler'));

app.get('/*', function (req, res) {
  
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    // send your xhr response here
    res.sendStatus(404);
  } else {
    // send your normal response here
    res.sendFile(path.join(__dirname, relativePath, 'build', 'index.html'));
  }
  
});

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server running on port ${port}`));

module.exports = app;
