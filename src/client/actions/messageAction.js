import axios from 'axios';
import {API_URL, GET_ALL_MESSAGES} from './types';

export const getMessages = (payload) => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/message/${payload}`);
  dispatch({
    type: GET_ALL_MESSAGES,
    payload: data
  })
};

export const addMessage = (payload) => async () => {
  console.log(payload);
  const {data: {data}} = await axios.post(`${API_URL}/api/message/send`, payload)
};
