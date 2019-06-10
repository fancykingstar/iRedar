import axios from 'axios';

import {
  API_URL,
  GET_CURRENT_USER_PERMISSIONS,
  CLEAR_CURRENT_PERMISSIONS,
  GET_ADMIN_PERMISSIONS
} from './types';

// Get current user's permissions
export const getCurrentUserPermissions = profileId => async dispatch => {
    const res = await axios.get(`${API_URL}/api/organizations/permissions/${profileId}`);
    dispatch({
        type: GET_CURRENT_USER_PERMISSIONS,
        payload: res.data
    });
};

// Join organization
export const joinOrganization = (userData, profileId) => async dispatch => {
    await axios.post(`${API_URL}/api/organizations/permission`, userData);
    dispatch(getCurrentUserPermissions(profileId));
};

// Get current admin permissions
export const getAdminPermissions = (organizationId, profileId) => async dispatch => {
    const res = await axios.get(`${API_URL}/api/organizations/permissions/admin/${organizationId}/${profileId}`);
    dispatch({
        type: GET_ADMIN_PERMISSIONS,
        payload: res.data
    });
};

//Edit User Permissions throught Admin Account
export const editAdminPermissions = (userData, organizationId, profileId) => async dispatch => {
    await axios.post(`${API_URL}/api/organizations/permissions/admin`, userData);
    dispatch(getAdminPermissions(organizationId, profileId));
};

export const clearCurrentPermission = () => {
  return {
    type: CLEAR_CURRENT_PERMISSIONS
  };
};
