import axios from 'axios';
import Cookie from 'cookies-js';
import jwt from 'jsonwebtoken';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FAIL,
  LOGOUT_USER,
} from '../constants/actionTypes';
import config from '../config';
import { backendRoutes } from '../constants/routes';

// USER_LOGIN
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const setCurrentUserError = error => ({
  type: SET_CURRENT_USER_FAIL,
  error,
});

export const startUserSignIn = ({
  username,
  password,
}) => (dispatch) => {
  const userDetails = { username, password };
  return axios
    .post(`${config.apiUrl}${backendRoutes.LOGIN}`, userDetails)
    .then((response) => {
      const { token } = response.data.data.user;
      Cookie.set('jwtToken', token);
      dispatch(setCurrentUser(jwt.decode(token)));
      return response;
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(setCurrentUserError(message));
    });
};

export const startUserSignUp = ({
  username, fullname, email, password,
}) => (dispatch) => {
  const userDetails = {
    username, fullname, email, password,
  };
  return axios.post(`${config.apiUrl}${backendRoutes.SIGN_UP}`, userDetails)
    .then((response) => {
      const { token } = response.data.data.user;
      Cookie.set('jwtToken', token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(setCurrentUserError(message));
    });
};

export const logoutCurrentUser = () => ({
  type: LOGOUT_USER,
});

export const logoutAction = () => (dispatch) => {
  Cookie.expire('jwtToken');
  dispatch(logoutCurrentUser({}));
};
