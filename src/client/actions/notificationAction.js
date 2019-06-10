import axios from 'axios';
import {API_URL, GET_ALL_NOTIFICATIONS, SHOW_NOTIFICATION, DELETE_NOTIFICATION} from './types';

export const getNotifications = (id) => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/notifications`, {params: {id}});
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

export const deleteNotifications = (ids) => async dispatch => {
  const res = await axios.post(`${API_URL}/api/notifications/delete/${ids}`);
  dispatch({
    type: DELETE_NOTIFICATION,
    payload: ids
  })
};

