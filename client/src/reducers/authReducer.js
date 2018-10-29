import isEmpty from 'is-empty';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FAIL,
  LOGOUT_USER,
} from '../constants/actionTypes';

// Auth Reducer

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
};

/**
 * Reducer handling user authentication
 *(signup, login, logout)
 *
 * @param {Object} state initial state for the auth Information section of the store
 * @param {Object} action the dispatched action
 *
 * @returns {Object} new state of the auth Information section of the store
 */
export default (state = initialState, action) => {
  const { type, user, error } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(user),
        user,
      };
    case SET_CURRENT_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error,
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
