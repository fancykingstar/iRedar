const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./configs/logger');

const users = require('./routes/users');
const organizations = require('./routes/organization');
const submissions = require('./routes/submission');

// eslint-disable no-console

// Initial express app
const app = express();

// Log requests info
app.use(morgan('dev'));

// Handle CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database config
const db = require('./configs/keys').mongoURI;

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err));
  mongoose.set('useCreateIndex', true);
}

// Passport Config
app.use(passport.initialize());
require('./configs/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/organizations', organizations);
app.use('/api/submissions', submissions);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.info(`Server running on port ${port}`));

module.exports = app;
