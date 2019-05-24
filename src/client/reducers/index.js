import {combineReducers} from 'redux';
import accessReducer from './accessReducer';
import authReducer from './authReducer';
import contactReducer from './contactReducer';
import errorReducer from './errorReducer';
import notificationReducer from './notificationReducer';
import referralReducer from './referralReducer';
import submissionReducer from './submissionReducer';
import uploadFormReducer from './uploadFormReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  access: accessReducer,
  submissions: submissionReducer,
  uploadForms: uploadFormReducer,
  referrals: referralReducer,
  contacts: contactReducer,
  notifications: notificationReducer
});
