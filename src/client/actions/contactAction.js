import axios from 'axios';
import {API_URL, EDIT_CONTACT, GET_ALL_CONTACTS, GET_ERRORS} from './types';

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
    const {data: {data}} = await axios.post(`${API_URL}/api/contacts/`, payload);
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

export const getContact = (payload) => async dispatch => {
  
  try {
    const {data: {data}} = await axios.get(`${API_URL}/api/contacts/${payload}`);
    dispatch({
      type: EDIT_CONTACT,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    //throw new Error(error);
  }
};

export const updateContact = (id, payload, history) => async dispatch => {
  try {
    const {data: {data}} = await axios.patch(`${API_URL}/api/contacts/${id}`, payload);
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

export const deleteContacts = (ids, history) => async dispatch => {
  console.log(ids);
  try {
    await axios.delete(`${API_URL}/api/contacts/`, {
      params: {
        ids
      }
    });
    //getContacts();
    //history.push({
    //  pathname: `/contacts/`
    //});
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    //throw new Error(error);
  }
};
