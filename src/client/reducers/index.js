import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import accessReducer from './accessReducer';
import submissionReducer from './submissionReducer';
import uploadFormReducer from './uploadFormReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  access: accessReducer,
  submissions: submissionReducer,
  uploadForms: uploadFormReducer
});
