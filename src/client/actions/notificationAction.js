import axios from 'axios';
import {API_URL, GET_ALL_NOTIFICATIONS, SHOW_NOTIFICATION} from './types';

export const getNotifications = () => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/notifications`);
  dispatch({
    type: GET_ALL_NOTIFICATIONS,
    payload: data
  });
};

export const addNotification = (payload, history) => async () => {
  const {data: {data}} = await axios.post(`${API_URL}/api/notifications/`, payload);
  history.push({
    pathname: `/notifications`
  });
};

export const getNotification = (payload) => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/notifications/${payload}`);
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: data
  });
};

export const deleteNotifications = (ids) => async () => {
  await axios.delete(`${API_URL}/api/notifications/`, {
    params: {
      ids
    }
  });
};

