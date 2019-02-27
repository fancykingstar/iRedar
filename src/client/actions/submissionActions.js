import axios from 'axios';

import {
  API_URL,
  GET_ERRORS,
  GET_ALL_SUBMISSIONS,
  GET_SUBMISSION
} from './types';

// Get all submissions
export const getAllSubmissions = userData => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/api/submissions/all`, userData);
    dispatch({
      type: GET_ALL_SUBMISSIONS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Get a submission
export const getSubmission = (userData, submissionId) => async dispatch => {
  try {
    const res = await axios.post(
      `${API_URL}/api/submissions/${submissionId}`,
      userData
    );
    dispatch({
      type: GET_SUBMISSION,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
