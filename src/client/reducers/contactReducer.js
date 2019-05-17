import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  GET_ALL_CONTACTS,
  GET_ERRORS,
  UPDATE_CONTACT
} from '../actions/types';

const initialState = {
  loading: true,
  allContacts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTACTS:
      return {
        ...state,
        loading: false,
        allContacts: action.payload
      };
    case ADD_CONTACT:
      return state;
    case UPDATE_CONTACT:
      return state;
    case EDIT_CONTACT:
      return state;
    case DELETE_CONTACT:
      return state;
    case GET_ERRORS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
