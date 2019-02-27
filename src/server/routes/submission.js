const express = require('express');
const passport = require('passport');

const router = express.Router();

const submissionController = require('../controllers/submission');

// @route POST api/submissions
// @desc Submiss form
// @access Public
router.post('/', submissionController.postSubmission);

// @route GET api/submissions/all
// @desc Return all submissions
// @access Private
router.post(
  '/all',
  passport.authenticate('jwt', { session: false }),
  submissionController.getAllSubmissions,
);

// @route POST api/submissions/:submissionId
// @desc Return a submission
// @access Private
router.post(
  '/:submissionId',
  passport.authenticate('jwt', { session: false }),
  submissionController.getSubmission,
);

module.exports = router;
