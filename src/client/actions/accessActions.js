import axios from 'axios';

import {
  API_URL,
  GET_ERRORS,
  GET_CURRENT_USER_PERMISSIONS,
  CLEAR_CURRENT_PERMISSIONS,
  GET_ADMIN_PERMISSIONS
} from './types';

// Get current user's permissions
export const getCurrentUserPermissions = profileId => async dispatch => {
  try {
    const res = await axios.get(
      `${API_URL}/api/organizations/permissions/${profileId}`
    );
    dispatch({
      type: GET_CURRENT_USER_PERMISSIONS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    throw new Error(error);
  }
};

// Join organization
export const joinOrganization = (userData, profileId) => async dispatch => {
  try {
    const res = await axios.post(
      `${API_URL}/api/organizations/permission`,
      userData
    );
    console.log(res.data);

    dispatch(getCurrentUserPermissions(profileId));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Get current admin permissions
export const getAdminPermissions = (
  organizationId,
  profileId
) => async dispatch => {
  try {
    const res = await axios.get(
      `${API_URL}/api/organizations/permissions/admin/${organizationId}/${profileId}`
    );
    dispatch({
      type: GET_ADMIN_PERMISSIONS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    // throw new Error(error);
  }
};

//
export const editAdminPermissions = (
  userData,
  organizationId,
  profileId
) => async dispatch => {
  try {
    await axios.post(
      `${API_URL}/api/organizations/permissions/admin`,
      userData
    );
    dispatch(getAdminPermissions(organizationId, profileId));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const clearCurrentPermission = () => {
  return {
    type: CLEAR_CURRENT_PERMISSIONS
  };
};
