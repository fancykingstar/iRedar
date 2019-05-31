const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

const inboxController = require('../controllers/inbox');

/**
 * @route /api/inbox/:id
 * @description Get the list of inboxes for id
 * @access Private
 **/
router.get('/:id', middleware(inboxController.index));

/**
 * @route /api/inbox/show/:inboxId
 * @description Get an Inbox
 * @access Private
 **/
router.get('/show/:inboxId', middleware(inboxController.getInbox));


module.exports = router;
