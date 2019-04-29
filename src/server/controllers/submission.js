const logger = require('../configs/logger');

const Submission = require('../models/Submission');
const Organization = require('../models/Organization');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile')

// @route POST api/submissions
// @desc Submit form
// @access Public
exports.postSubmission = async (req, res) => {
  console.log(req.body);
  try {

    const submission = await new Submission({
      content: req.body,
      userId: req.user._id
    });
    await submission.save();

    return res.json({
      success: true,
    });
  } catch (error) {
   console.error(error)
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route POST api/submissions/all
// @desc Return all submissions
// @access Private
exports.getAllSubmissions = async (req, res) => {
  console.log(req.body);
  const { profileId, organizationId } = req.body;


  console.log("USER IS ", req.user);

  try {

    let organization = await Organization.findById(organizationId);

    const permissions = await Permission.findOne({
      profile: profileId,
      organization: organizationId,
    });

    if (!(permissions.role === 'admin' || permissions.role === "staff")) {
      return res.status(422).json({
        alert: {
          title: 'Access denied!',
          detail: 'You do not have permissions',
        },
      });
    }

    console.log(organization);

    let users = organization.users;
    const allSubmissions = await Submission.find({userId: {$in: users}}).sort({
      dateSubmitted: 'desc',
    });
    return res.json({
      success: true,
      allSubmissions,
    });
  } catch (error) {
    console.error(error)
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route POST api/submissions/:submissionId
// @desc Return a submission
// @access Private
exports.getSubmission = async (req, res) => {
  const { profileId, organizationId } = req.body;
  const { submissionId } = req.params;

  try {
    const permissions = await Permission.findOne({
      profile: profileId,
      // organization: organizationId,
    });

    if (permissions.role === 'admin') {
      const submission = await Submission.findOne({
        _id: submissionId,
      });
      return res.json({
        success: true,
        submission,
      });
    }
    return res.status(422).json({
      alert: {
        title: 'Access denied!',
        detail: 'You do not have permissions',
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route POST api/submissions/:submissionId/delete
// @desc Return a submission
// @access Private
exports.deleteSubmission = async (req, res) => {
  const { profileId, organizationId } = req.body;
  const { submissionId } = req.params;

  try {
    const permissions = await Permission.findOne({
      profile: profileId,
      // organization: organizationId,
    });

    if (permissions.role === 'admin') {
      const submission = await Submission.findByIdAndRemove({
        _id: submissionId,
      });
      return res.json({
        success: true,
        submission,
      });
    }
    return res.status(422).json({
      alert: {
        title: 'Access denied!',
        detail: 'You do not have permissions',
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};

// @route GET api/submissions/form/:formType
// @desc Return a submission
// @access Private

exports.getSubmissionView = async (req, res) => {
  const { formType } = req.params;
  try {
      const allSubmissions = await Submission.find({
          'content.fromForm': formType,
      });
      return res.json({
          success: true,
          allSubmissions,
      });
  } catch (error) {
    logger.error(error);
    return res.status(422).json({
      alert: {
        title: 'Error!',
        detail: 'Server occurred an error,  please try again',
      },
    });
  }
};