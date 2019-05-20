const express = require('express');
const router = express.Router();

const contactController = require('../controllers/group');

/**
 * @route /api/contacts/
 * @description Get the list of contacts
 * @access Private
 **/
router.get('/', contactController.index);

/**
 * @route /api/contacts/store
 * @description Store new contact resource
 * @access Private
 **/
router.post('/', contactController.store);

/**
 * @route /api/contacts/:id/edit
 * @description Get the contact resource
 * @access Private
 **/
router.get('/:id', contactController.edit);

/**
 * @route /api/contacts/:id/update
 * @description Update the contact resource
 * @access Private
 **/
router.patch('/:id', contactController.update);

/**
 * @route /api/contacts/:id/delete
 * @description Delete the contact resource
 * @access Private
 **/
router.delete('/:id/delete', contactController.delete);

module.exports = router;
