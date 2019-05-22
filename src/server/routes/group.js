const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

const groupController = require('../controllers/group');

/**
 * @route /api/groups/
 * @description Get the list of group
 * @access Private
 **/
router.get('/', middleware(groupController.index));

/**
 * @route /api/groups/
 * @description Store new group resource
 * @access Private
 **/
router.post('/', middleware(groupController.store));

/**
 * @route /api/groups/:id/
 * @description Get the group resource
 * @access Private
 **/
router.get('/:id', middleware(groupController.edit));

/**
 * @route /api/groups/:id/
 * @description Update the group resource
 * @access Private
 **/
router.patch('/:id', middleware(groupController.update));

/**
 * @route /api/groups/:id/
 * @description Delete the group resource
 * @access Private
 **/
router.delete('/:id', middleware(groupController.delete));

module.exports = router;
