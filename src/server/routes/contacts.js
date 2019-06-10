const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

const contactController = require('../controllers/contact');

/**
 * @route /api/contacts/
 * @description Get the list of contacts
 * @access Private
 **/
router.get('/:userId', middleware(contactController.index));

/**
 * @route /api/contacts/
 * @description Store new contact resource
 * @access Private
 **/
router.post('/', middleware(contactController.store));

/**
 * @route /api/contacts/:id
 * @description Get the contact resource
 * @access Private
 **/
router.get('/:id', middleware(contactController.edit));

/**
 * @route /api/contacts/:id
 * @description Update the contact resource
 * @access Private
 **/
router.patch('/:id', middleware(contactController.update));

/**
 * @route /api/contacts/
 * @description Delete the contact resource
 * @access Private
 **/
router.delete('/', middleware(contactController.delete));

/**
 * @route /api/contacts/:id/private-notes
 * @description Update the contact's private notes
 * @access Private
 **/
router.patch('/:id/private-notes', middleware(contactController.updatePrivateNotes));

/**
 * @route /api/contacts/upload-profile-photo
 * @description Upload the Profile Photo
 * @access Private
 **/
router.patch('/:id/upload-profile-photo', middleware(contactController.uploadProfilePhoto));

/**
 * @route /api/contacts/filter
 * @description Get the list of contacts by filter
 * @access Private
 **/
router.get('/:profession/:company/:type', middleware(contactController.filter));

/**
 * @route /api/contacts/invite
 * @description Invite to the client portal
 * @access Private
 **/
router.post('/:id/invite', middleware(contactController.inviteClientPortal));

/**
 * @route /api/contacts/changeaccess
 * @description changeInviteAccess
 * @access Private
 **/
router.patch('/:id/changeaccess', middleware(contactController.changeInviteAccess));

router.patch('/:id/updateinviteaccess', middleware(contactController.updateInviteAccess));

module.exports = router;
