import axios from 'axios';
import {API_URL} from './types';

export const addGroup = (payload) => async () => {
  await axios.post(`${API_URL}/api/groups/`, payload);
};
