import axios from 'axios';
import {API_URL, GET_ALL_CONTACTS, GET_ERRORS} from './types';

export const getContacts = () => async dispatch => {
  try {
    const {data: {data}} = await axios.get(`${API_URL}/api/contacts`);
    dispatch({
      type: GET_ALL_CONTACTS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    throw new Error(error);
  }
};

export const addContact = (payload, history) => async dispatch => {
  try {
    const {data: {data}} = await axios.post(`${API_URL}/api/contacts/store`, {data: payload});
    history.push({
      pathname: `/contacts/view/${data._id}`
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    //throw new Error(error);
  }
};
