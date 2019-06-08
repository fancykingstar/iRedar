import { SET_ALL_REFERRALS } from '../actions/referralActions'
import { DELETE_REFERRALS } from '../actions/types'

const initialState = {
    loading: true,
    referralForms: [{}]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_REFERRALS:
            return {
                ...state,
                referralForms: action.payload.referrals,
                loading: false
            }
        case DELETE_REFERRALS:
            return {
                ...state,
                referralForms: state.referralForms.filter(referral => {
                    return referral._id != action.payload;
                })
            }
        default:
            return state
    }
}
