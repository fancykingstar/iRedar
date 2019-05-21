import {EDIT_CONTACT, GET_ALL_CONTACTS, GET_ERRORS} from '../actions/types';

const initialState = {
  loading: true,
  allContacts: [],
  contact: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTACTS:
      return {
        ...state,
        loading: false,
        allContacts: action.payload
      };
    case EDIT_CONTACT:
      return {
        ...state,
        loading: false,
        contact: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
