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
  allContacts: [],
  contact: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTACTS:
      console.log(action.payload, 'actionpayload');
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
      return {
        ...state,
        loading: false,
        contact: action.payload
      };
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
