import axios from 'axios';
import { backendRoutes, frontendRoutes } from '../constants/routes';
import { ADD_REQUEST, ADD_REQUEST_ERROR, FETCH_REQUESTS, FETCH_REQUESTS_ERROR } from '../constants/actionTypes';
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
    .then((response) => {
      dispatch(addRequest({ ...response.data.data.request }));
      history.push(frontendRoutes.USER_DASHBOARD);
    })
    .catch((error) => {
      dispatch(addRequestError(error.response.data));
    });
};

export const fetchRequests = requests => ({
  type: FETCH_REQUESTS,
  requests,
});

export const fetchRequestsError = error => ({
  type: FETCH_REQUESTS_ERROR,
  error,
});

export const startFetchRequests = () => dispatch => axios
  .get(`${config.apiUrl}${backendRoutes.REQUESTS}`)
  .then((response) => {
    const { request } = response.data.data;
    if (request) {
      dispatch(fetchRequests(request));
    }
    return response;
  })
  .catch((error) => {
    dispatch(fetchRequestsError(error.response.data));
  });
