import axios from 'axios';
import { API_URL, GET_ALL_INBOXES, GET_INBOX, CLEAR_INBOX, DELETE_INBOX } from './types';

export const getInboxes = (payload) => async dispatch => {
  const { data: { data } } = await axios.get(`${API_URL}/api/inbox/${payload}`);
  dispatch({
    type: GET_ALL_INBOXES,
    payload: data
  });
};

export const getInbox = (payload) => async dispatch => {
  const { data: { data } } = await axios.get(`${API_URL}/api/inbox/show/${payload}`);
  dispatch({
    type: GET_INBOX,
    payload: data
  });
};

export const deleteInbox = (inbox) => async dispatch => {
  console.log("what you are send:", inbox);
  const { data: { data } } = await axios.post(`${API_URL}/api/inbox/delete/${inbox._id}`);
  dispatch({
    type: DELETE_INBOX,
    payload: inbox._id
  })
};
  
export const clearInbox = () => async dispatch => {
  dispatch({
    type: CLEAR_INBOX      
  })
};
