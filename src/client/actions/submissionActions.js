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

// Edit a submission
export const editSubmission = (profileId, submission, submissionId) => async dispatch => {
  let postBody = {
    profileId: profileId,
    submission: submission
  };
  try {
    const res = await axios.post(`${API_URL}/api/submissions/${submissionId}/edit`,
        postBody
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

// Delete a submission
export const deleteSubmission = (userData, submissionId) => async dispatch => {
  try {
    const res = await axios.post(
        `${API_URL}/api/submissions/${submissionId}/delete`,
        userData
    );
    console.log(res);
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

// Get Submission View based on Form type
export const getSubmissionView = (formType) => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/submissions/form/${formType}`);
    dispatch({
      type: GET_ALL_SUBMISSIONS,
      payload: res.data
    });
  }catch(error){
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      payload: error.respond.data
    })
  }
};