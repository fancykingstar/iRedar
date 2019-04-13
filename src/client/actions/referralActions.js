import axios from 'axios'
import { API_URL, GET_ERRORS } from './types';

export const SET_ALL_REFERRALS = 'referral/referralForm/SET_ALL_REFERRALS'

export const uploadReferralToServer = form => async dispatch => {
    try {
        await axios.post(
            `${API_URL}/api/upload-referral`,
            form
        )
        dispatch(getAllReferralForms(form.sender))
    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
        throw new Error(error)
    }
}

export const getReferralForm = referralId => async dispatch => {
    try {
        const res = await axios.get(
            `${API_URL}/api/upload-referral/referrals/` + referralId,
        )
        dispatch(setAllReferrals(res.data))
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
        throw new Error(error);
    }
}

export const getAllReferralForms = profileId => async dispatch => {
    try {
        const res = await axios.get(
            `${API_URL}/api/upload-referral/` + profileId,
        )
        dispatch(setAllReferrals(res.data))
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
        throw new Error(error);
    }
}

export const setAllReferrals = payload => (
    {
        type: SET_ALL_REFERRALS,
        payload
    }
)
