import axios from 'axios'
import { API_URL, DELETE_REFERRALS} from './types';

export const SET_ALL_REFERRALS = 'referral/referralForm/SET_ALL_REFERRALS'

export const uploadReferralToServer = form => async dispatch => {
    await axios.post(
        `${API_URL}/api/upload-referral`,
        form
    )
    dispatch(getAllReferralForms(form.sender))
}

export const getReferralForm = referralId => async dispatch => {
    const res = await axios.get(
        `${API_URL}/api/upload-referral/referrals/` + referralId,
    )
    dispatch(setAllReferrals(res.data))
}

export const getAllReferralForms = profileId => async dispatch => {
    const res = await axios.get(
        `${API_URL}/api/upload-referral/` + profileId,
    )
    dispatch(setAllReferrals(res.data))
}

export const setAllReferrals = payload => (
    {
        type: SET_ALL_REFERRALS,
        payload
    }
)

export const deleteReferral = (payload) => async dispatch => {
  const res = await axios.post(`${API_URL}/api/upload-referral/delete/${payload}`);
  dispatch({
    type:  DELETE_REFERRALS,
    payload: payload
  })
};
