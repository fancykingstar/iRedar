import axios from 'axios';

import {
    API_URL,
    GET_ERRORS
} from './types';
import setAuthToken from "../utils/setAuthToken";

export const registerPayment = (paymentData, history) => async dispatch => {

    // getter
    const token = localStorage.getItem('jwtToken');
    // Set token to Auth header
    setAuthToken(token);
    await axios.post(`${API_URL}/api/payment/register`, paymentData)
        .then(res => {
            history.push({
                pathname: '/settings/admin-settings',
                isRegistered: true,
                detail: 'Payment information created!'
            });
        }).catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            });
        });
};

export const changePaymentPlan = (payload, history) => async dispatch => {
    // getter
    const token = localStorage.getItem('jwtToken');
    // Set token to Auth header
    setAuthToken(token);
    await axios.post(`${API_URL}/api/payment/changePlan`, payload)
        .then(res => {
            history.push({
                pathname: '/settings/admin-settings',
                isRegistered: true,
                detail: 'Payment plan changed!'
            });
        }).catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            });
        });
};


export const deRegisterPayment = (history) => async dispatch => {
    // getter
    const token = localStorage.getItem('jwtToken');
    // Set token to Auth header
    setAuthToken(token);
    await axios.delete(`${API_URL}/api/payment/deregister`)
        .then(res => {
            history.push({
                pathname: '/settings/admin-settings',
                isRegistered: true,
                detail: 'Payment information and subscription deleted!'
            });
        }).catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            });
        });
};