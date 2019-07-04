import axios from 'axios';

import {
  API_URL,
  GET_ALL_SUBMISSIONS,
  GET_SUBMISSION
} from './types';

// Get all submissions
export const getAllSubmissions = userData => async dispatch => {
    const res = await axios.post(`${API_URL}/api/submissions/all`, userData);
    console.log(res.data);
    dispatch({
        type: GET_ALL_SUBMISSIONS,
        payload: res.data
    });
};

// Get a submission
export const getSubmission = (userData, submissionId) => async dispatch => {
    const res = await axios.post(`${API_URL}/api/submissions/${submissionId}`, userData);
    dispatch({
        type: GET_SUBMISSION,
        payload: res.data
    });
};

// Edit a submission
export const editSubmission = (profileId, submission, submissionId) => async dispatch => {
  let postBody = {
    profileId: profileId,
    submission: submission
  };
    const res = await axios.post(`${API_URL}/api/submissions/${submissionId}/edit`, postBody);
    dispatch({
        type: GET_SUBMISSION,
        payload: res.data
    });
};

// Delete a submission
export const deleteSubmission = (userData, submissionId) => async dispatch => {
    const re = await axios.post(`${API_URL}/api/submissions/${submissionId}/delete`, userData);
    const res = await axios.post(`${API_URL}/api/submissions/all`, userData);
    dispatch({
        type: GET_ALL_SUBMISSIONS,
        payload: res.data
    });
};

// Get Submission View based on Form type
export const getSubmissionView = (formType) => async dispatch => {
    const res = await axios.get(`${API_URL}/api/submissions/form/${formType}`);
    dispatch({
        type: GET_ALL_SUBMISSIONS,
        payload: res.data
    });
};

export const searchByDate = (payload) => async dispatch => {
    dispatch({
        type: GET_ALL_SUBMISSIONS,
        payload: payload
    });
}