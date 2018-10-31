import axios from 'axios';
import { backendRoutes, frontendRoutes } from '../constants/routes';
import { ADD_REQUEST, ADD_REQUEST_ERROR } from '../constants/actionTypes';
import config from '../config';


export const addRequest = request => ({
  type: ADD_REQUEST,
  request,
});

export const addRequestError = error => ({
  type: ADD_REQUEST_ERROR,
  error,
});

export const startAddRequest = (requestData = {}, history) => (dispatch) => {
  const {
    title,
    type = 'repairs',
    description,
  } = requestData;

  const request = { title, type, description };
  return axios
    .post(`${config.apiUrl}${backendRoutes.REQUESTS}`, request)
    .then(() => {
      dispatch(addRequest({ ...request }));
      history.push(frontendRoutes.USER_DASHBOARD);
    })
    .catch((error) => {
      dispatch(addRequestError(error.response.data));
    });
};
