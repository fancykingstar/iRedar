import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {API_URL, EDIT_CONTACT, GET_ALL_CONTACTS} from './types';

export const getContacts = () => async dispatch => {
  // getter
  const token = localStorage.getItem('jwtToken');
  // Decode token to get user data
  const decoded = jwt_decode(token);
  const {data: {data}} = await axios.get(`${API_URL}/api/contacts/${decoded.userId}`);
  dispatch({
    type: GET_ALL_CONTACTS,
    payload: data
  });
};

export const addContact = (payload, history) => async () => {
  // getter
  const token = localStorage.getItem('jwtToken');
  // Decode token to get user data
  const decoded = jwt_decode(token);
  const postData = {
    ...payload,
    created_by: decoded.userId
  }

  const {data: {data}} = await axios.post(`${API_URL}/api/contacts/`, postData);
  history.push({
    pathname: `/contacts`
  });
};

export const getContact = (payload) => async dispatch => {
  const {data: {data}} = await axios.patch(`${API_URL}/api/contacts/${payload}/updateinviteaccess`);
  // const {data: {data}} = await axios.get(`${API_URL}/api/contacts/${payload}`);
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

export const updateContactPrivateNotes = (payload) => async () => {
  await axios.patch(`${API_URL}/api/contacts/${payload._id}/private-notes`, {notes: payload.notes});
};

export const uploadProfileImage = (id, forms) => async dispatch => {
  await axios.patch(
    `${API_URL}/api/contacts/${id}/upload-profile-photo`,
    forms
  );
  dispatch(getContact(id))
}

export const getContactsByFilter = (profession, company, type) => async dispatch => {
  const {data: {data}} = await axios.get(
    `${API_URL}/api/contacts/${profession}/${company}/${type}`
  );
  dispatch({
    type: GET_ALL_CONTACTS,
    payload: data
  });
}

export const inviteToAccessClientPortal = (id, payload) => 
async dispatch => {
  await axios.post(
    `${API_URL}/api/contacts/${id}/invite`,
    payload
  );

  dispatch(changeInviteAccess(id, payload))
}

export const changeInviteAccess = (id, payload) => async dispatch => {
  await axios.patch(
    `${API_URL}/api/contacts/${id}/changeaccess`,
    payload
  )
  dispatch(getContact(id))
}
