import { combineReducers } from 'redux';
import accessReducer from './accessReducer';
import authReducer from './authReducer';
import contactReducer from './contactReducer';
import errorReducer from './errorReducer';
import notificationReducer from './notificationReducer';
import referralReducer from './referralReducer';
import submissionReducer from './submissionReducer';
import uploadFormReducer from './uploadFormReducer';
import organizationReducer from './organizationReducer';
import messageReducer from './messageReducer';
import inboxReducer from './inboxReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  access: accessReducer,
  submissions: submissionReducer,
  uploadForms: uploadFormReducer,
  referrals: referralReducer,
  contacts: contactReducer,
  notifications: notificationReducer,
  organization: organizationReducer,
  message: messageReducer,
  inbox: inboxReducer,
  users: userReducer
});
