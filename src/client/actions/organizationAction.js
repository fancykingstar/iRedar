// Get current admin permissions
import axios from "axios";
import {API_URL, GET_ORGANIZATION, GET_ERRORS} from "./types";

export const getOrganization = (organizationId) => async dispatch => {
    const res = await axios.get(`${API_URL}/api/organizations/${organizationId}/`);
    dispatch({
        type: GET_ORGANIZATION,
        payload: res.data
    });
};