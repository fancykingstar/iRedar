import axios from 'axios';
import {API_URL, GET_USERS} from './types';

export const getUsers = () => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/users`);
  dispatch({
    type: GET_USERS,
    payload: data
  });
};