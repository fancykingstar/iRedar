const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

/**
 * @route /api/contacts/
 * @description Get the list of contacts
 * @access Private
 **/
router.get('/', contactController.index);

/**
 * @route /api/contacts/
 * @description Store new contact resource
 * @access Private
 **/
router.post('/', contactController.store);

/**
 * @route /api/contacts/:id
 * @description Get the contact resource
 * @access Private
 **/
router.get('/:id', contactController.edit);

/**
 * @route /api/contacts/:id
 * @description Update the contact resource
 * @access Private
 **/
router.patch('/:id', contactController.update);

/**
 * @route /api/contacts/
 * @description Delete the contact resource
 * @access Private
 **/
router.delete('/', contactController.delete);

/**
 * @route /api/contacts/:id/private-notes
 * @description Update the contact's private notes
 * @access Private
 **/
router.patch('/:id/private-notes', contactController.updatePrivateNotes);

module.exports = router;
