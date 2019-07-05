import axios from 'axios';
import {API_URL, GET_ALL_SOCKET_NOTIFICATIONS, SHOW_NOTIFICATION, DELETE_NOTIFICATION} from './types';

export const getSocketNotification = (id) => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/socketnotifications`, {params: {id}});
  dispatch({
    type: GET_ALL_SOCKET_NOTIFICATIONS,
    payload: data
  });
};

export const editSocketNotification = (_id, id) => async (dispatch) => {
  const payload = {
    _id: _id,
    id: id
  };
  const {data: {data}} = await axios.post(`${API_URL}/api/socketnotifications/`, payload);
  dispatch({
    type: GET_ALL_SOCKET_NOTIFICATIONS,
    payload: data
  });
};

export const getNotification = (payload) => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/notifications/${payload}`);
  dispatch({
    type: SHOW_NOTIFICATION,
    payload: data
  });
};

export const deleteNotifications = (ids, id) => async dispatch => {
  const res = await axios.post(`${API_URL}/api/notifications/delete/${ids}`);
  const {data: {data}} = await axios.get(`${API_URL}/api/notifications`, {params: {id}});
  dispatch({
    type: DELETE_NOTIFICATION,
    payload: data
  })
};
