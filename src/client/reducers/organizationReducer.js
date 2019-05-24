import {
    GET_ORGANIZATION,
} from '../actions/types';

const initialState = {
    organization: {},
    loading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORGANIZATION:
            return {
                ...state,
                organization: action.payload.organization
            };
        default:
            return state;
    }
}
