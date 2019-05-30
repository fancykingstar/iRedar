const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

const messageController = require('../controllers/message');

/**
 * @route /api/message/send/
 * @description Store new message
 * @access Private
 **/
router.post('/send', middleware(messageController.postMessage));

/**
 * @route /api/message/
 * @description Get list of messages
 * @access Private
 */
router.get('/:inboxId', middleware(messageController.getMessages))

module.exports = router;
