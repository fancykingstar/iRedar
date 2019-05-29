import {GET_USERS} from '../actions/types';

const initialState = {
  loading: true,
  allUsers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        allUsers: action.payload
      };
    default:
      return state;
  }
}
