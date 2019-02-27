import jwt_decode from 'jwt-decode';

import setAuthToken from './setAuthToken';
import {
  setCurrentUser,
  getCurrentUserProfile,
  logoutUser
} from '../actions/authActions';
import { getCurrentUserPermissions } from '../actions/accessActions';

export let decoded = {};
// Check for token
export default async store => {
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user
    try {
      decoded = await jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));

      // Get current user's profile
      try {
        await store.dispatch(getCurrentUserProfile(decoded.userId));
      } catch (error) {
        store.dispatch(logoutUser());
      }

      // Get current user's permissions
      try {
        await store.dispatch(getCurrentUserPermissions(decoded.profileId));
      } catch (error) {
        store.dispatch(logoutUser());
      }

      // Check for expried token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
      }
    } catch (error) {
      // Logout user
      store.dispatch(logoutUser());
      window.location.href = '/';
    }
  }
};
