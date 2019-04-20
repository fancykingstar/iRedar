import { SET_ALL_REFERRALS } from '../actions/referralActions'

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
        default:
            return state
    }
}
