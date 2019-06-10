import axios from 'axios';

import {
    API_URL
} from './types';
import setAuthToken from "../utils/setAuthToken";

export const registerPayment = (paymentData, history) => async dispatch => {
    // getter
    const token = localStorage.getItem('jwtToken');
    // Set token to Auth header
    setAuthToken(token);
    await axios.post(`${API_URL}/api/payment/register`, paymentData);
    history.push({
        pathname: '/settings/admin-settings',
        isRegistered: true,
        detail: 'Payment information created!'
    });
};

export const changePaymentPlan = (payload, history) => async dispatch => {
    // getter
    const token = localStorage.getItem('jwtToken');
    // Set token to Auth header
    setAuthToken(token);
    await axios.post(`${API_URL}/api/payment/changePlan`, payload);
    history.push({
        pathname: '/settings/admin-settings',
        isRegistered: true,
        detail: 'Payment plan changed!'
    });
};


export const deRegisterPayment = (history) => async dispatch => {
    // getter
    const token = localStorage.getItem('jwtToken');
    // Set token to Auth header
    setAuthToken(token);
    await axios.delete(`${API_URL}/api/payment/deregister`);
    history.push({
        pathname: '/settings/admin-settings',
        isRegistered: true,
        detail: 'Payment information and subscription deleted!'
    });
};