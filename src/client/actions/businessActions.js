import axios from 'axios';

import {
    API_URL
} from './types';

export const registerBusiness = (businessData, history) => async dispatch => {
    await axios.post(`${API_URL}/api/organizations/register`, businessData);
    history.push({
        pathname: '/',
        isRegistered: true,
        detail: 'Your organization have been created. Sign in now'
    });
};