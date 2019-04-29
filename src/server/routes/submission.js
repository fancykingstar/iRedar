const express = require('express');
const passport = require('passport');

const router = express.Router();

const submissionController = require('../controllers/submission');

// @route POST api/submissions
// @desc Submiss form
// @access Public
router.post('/', passport.authenticate('jwt', { session: false }),submissionController.postSubmission);

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

// @route POST api/submissions/:submissionId/edit
// @desc Return a submission
// @access Private
router.post(
    '/:submissionId/edit',
    passport.authenticate('jwt', { session: false }),
    submissionController.editSubmission,
);

// @route POST api/submissions/:submissionId/delete
// @desc Return a submission
// @access Private
router.post(
    '/:submissionId/delete',
    passport.authenticate('jwt', { session: false }),
    submissionController.deleteSubmission,
);


// @route GET api/submissions/:formType
// @desc Get all submitted form by form type
// @access Private
router.get(
    '/form/:formType',
    passport.authenticate('jwt', { session: false }),
    submissionController.getSubmissionView,
);
module.exports = router;
