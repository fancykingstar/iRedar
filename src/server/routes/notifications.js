const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

const notificationController = require('../controllers/notification');

/**
 * @route /api/notifications/
 * @description Get the list of notifications
 * @access Private
 **/
router.get('/', middleware(notificationController.index));

/**
 * @route /api/notifications/
 * @description Store new notification resource
 * @access Private
 **/
router.post('/', middleware(notificationController.store));

/**
 * @route /api/notifications/:id
 * @description Get the notification resource
 * @access Private
 **/
router.get('/:id', middleware(notificationController.edit));

/**
 * @route /api/notifications/:id
 * @description Update the notification resource
 * @access Private
 **/
router.patch('/:id', middleware(notificationController.update));

/**
 * @route /api/notifications/
 * @description Delete the notification resource
 * @access Private
 **/
router.delete('/', middleware(notificationController.delete));

module.exports = router;
