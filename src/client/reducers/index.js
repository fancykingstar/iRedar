import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import accessReducer from './accessReducer';
import submissionReducer from './submissionReducer';
import uploadFormReducer from './uploadFormReducer';
import referralReducer from './referralReducer';
import contactReducer from './contactReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  access: accessReducer,
  submissions: submissionReducer,
  uploadForms: uploadFormReducer,
  referrals: referralReducer,
  contacts: contactReducer
});
