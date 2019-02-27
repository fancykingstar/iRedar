import {
  GET_CURRENT_USER_PERMISSIONS,
  CLEAR_CURRENT_PERMISSIONS,
  GET_ADMIN_PERMISSIONS
} from '../actions/types';

const initialState = {
  permissions: [],
  admin: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload.permissions,
        loading: false
      };

    case GET_ADMIN_PERMISSIONS: {
      return {
        ...state,
        admin: action.payload.allPermissions
      };
    }
    case CLEAR_CURRENT_PERMISSIONS: {
      return {
        ...state,
        permissions: [],
        admin: [],
        loading: true
      };
    }

    default:
      return state;
  }
}
