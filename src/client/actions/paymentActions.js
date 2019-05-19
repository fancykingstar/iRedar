import axios from 'axios';

import {
    API_URL,
    GET_ERRORS
} from './types';
import setAuthToken from "../utils/setAuthToken";

//Add new user through ADMIN Role
export const registerPayment = (paymentData, history) => async dispatch => {
    try {
        console.log(paymentData);

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
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};


export const deRegisterPayment = (history) => async dispatch => {
    try {
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
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};