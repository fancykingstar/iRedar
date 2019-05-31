import axios from 'axios';
import { API_URL, GET_ALL_INBOXES, GET_INBOX } from './types';

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
