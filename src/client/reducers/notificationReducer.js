import {GET_ALL_NOTIFICATIONS, GET_ERRORS, SHOW_NOTIFICATION, DELETE_NOTIFICATION} from '../actions/types';

const initialState = {
  loading: true,
  allNotifications: [],
  notification: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        allNotifications: action.payload
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notification: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        loading: false,
        allNotifications: state.allNotifications.filter(notification => {
          return notification._id != action.payload;
        })
      }
    default:
      return state;
  }
}
