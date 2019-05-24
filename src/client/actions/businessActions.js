import axios from 'axios';

import {
    API_URL,
    GET_ERRORS
} from './types';

export const registerBusiness = (businessData, history) => async dispatch => {
    await axios.post(`${API_URL}/api/organizations/register`, businessData)
        .then(res => {
            history.push({
                pathname: '/',
                isRegistered: true,
                detail: 'Your organization have been created. Sign in now'
            });
        }).catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            });
        });
};