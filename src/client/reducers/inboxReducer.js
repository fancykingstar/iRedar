import {GET_ALL_INBOXES, GET_INBOX, CLEAR_INBOX} from '../actions/types';

const initialState = {
  loading: true,
  allInboxes: [],
  inbox: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INBOXES:
      return {
          ...state,
          loading: false,
          allInboxes: action.payload
      };
    case GET_INBOX:
      return {
        ...state,
        loading: false,
        inbox: action.payload
      };
    case CLEAR_INBOX:
        return {
          ...state,
          loading: false,
          inbox: {}
        };
    default:
      return state;
  }
}
