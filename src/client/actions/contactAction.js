import axios from 'axios';
import {API_URL, EDIT_CONTACT, GET_ALL_CONTACTS} from './types';

export const getContacts = () => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/contacts`);
  dispatch({
    type: GET_ALL_CONTACTS,
    payload: data
  });
};

export const addContact = (payload, history) => async () => {
  const {data: {data}} = await axios.post(`${API_URL}/api/contacts/`, payload);
  history.push({
    pathname: `/contacts`
  });
};

export const getContact = (payload) => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/contacts/${payload}`);
  dispatch({
    type: EDIT_CONTACT,
    payload: data
  });
};

export const updateContact = (id, payload, history) => async () => {
  const {data: {data}} = await axios.patch(`${API_URL}/api/contacts/${id}`, payload);
  history.push({
    pathname: `/contacts/view/${data._id}`
  });
};

export const deleteContacts = (ids) => async () => {
  await axios.delete(`${API_URL}/api/contacts/`, {
    params: {
      ids
    }
  });
};
