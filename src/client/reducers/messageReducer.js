import {GET_ALL_MESSAGES, DELETE_ONE_MESSAGE} from '../actions/types';

const initialState = {
  loading: true,
  allMessages: [],
  notification: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return {
        ...state,
        loading: false,
        allMessages: action.payload
      };
    default:
      return state;
  }
}
