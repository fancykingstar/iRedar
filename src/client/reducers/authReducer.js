import {CLEAR_CURRENT_PROFILE, EDIT_PROFILE, GET_CURRENT_USER_PROFILE, SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  profile: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_CURRENT_USER_PROFILE:
      return {
        ...state,
        profile: action.payload.profile
      };
    case EDIT_PROFILE: {
      return {
        ...state,
        profile: action.payload
      };
    }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {}
      };
    default:
      return state;
  }
}
