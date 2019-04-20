import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import accessReducer from './accessReducer';
import submissionReducer from './submissionReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  access: accessReducer,
  submissions: submissionReducer
});
