import axios from 'axios';
import toastr from 'toastr';
import { backendRoutes, frontendRoutes } from '../constants/routes';
import {
  ADD_REQUEST,
  ADD_REQUEST_ERROR,
  FETCH_REQUESTS,
  FETCH_REQUEST,
  FETCH_REQUESTS_ERROR,
  FETCH_REQUEST_ERROR,
  EDIT_REQUEST,
  EDIT_REQUEST_ERROR,
  FETCH_ADMIN_REQUESTS,
  FETCH_ADMIN_REQUESTS_ERROR,
  MANAGE_ADMIN_REQUEST_APPROVE,
  MANAGE_ADMIN_REQUEST_APPROVE_ERROR,
  MANAGE_ADMIN_REQUEST_DISAPPROVE,
  MANAGE_ADMIN_REQUEST_DISAPPROVE_ERROR,
  MANAGE_ADMIN_REQUEST_RESOLVE,
  MANAGE_ADMIN_REQUEST_RESOLVE_ERROR
} from '../constants/actionTypes';
import config from '../config';

export const addRequest = request => ({
  type: ADD_REQUEST,
  request
});

export const addRequestError = error => ({
  type: ADD_REQUEST_ERROR,
  error
});

export const startAddRequest = (requestData = {}, history) => dispatch => {
  const { title, type = 'repairs', description } = requestData;

  const request = { title, type, description };
  return axios
    .post(`${config.apiUrl}${backendRoutes.REQUESTS}`, request)
    .then(response => {
      dispatch(addRequest({ ...response.data.data.request }));
      history.push(frontendRoutes.USER_DASHBOARD);
    })
    .catch(error => {
      dispatch(addRequestError(error.response));
    });
};

export const fetchRequests = requests => ({
  type: FETCH_REQUESTS,
  requests
});

export const fetchRequestsError = error => ({
  type: FETCH_REQUESTS_ERROR,
  error
});

export const startFetchRequests = () => dispatch =>
  axios
    .get(`${config.apiUrl}${backendRoutes.REQUESTS}`)
    .then(response => {
      const { request } = response.data.data;
      if (request) {
        dispatch(fetchRequests(request));
      }
    })
    .catch(error => dispatch(fetchRequestsError(error.response)));

export const editRequest = request => ({
  type: EDIT_REQUEST,
  request
});

export const editRequestError = error => ({
  type: EDIT_REQUEST_ERROR,
  error
});

export const startEditRequest = (id, updates, history) => dispatch =>
  axios
    .put(`${config.apiUrl}${backendRoutes.REQUESTS}/${id}`, updates)
    .then(response => {
      dispatch(editRequest(response.data.data.request));
      history.push(frontendRoutes.USER_DASHBOARD);
    })
    .catch(error => {
      dispatch(editRequestError(error.response));
    });

export const fetchRequest = request => ({
  type: FETCH_REQUEST,
  request
});

export const fetchRequestError = error => ({
  type: FETCH_REQUEST_ERROR,
  error
});

export const startFetchRequest = id => dispatch =>
  axios
    .get(`${config.apiUrl}${backendRoutes.REQUESTS}/${id}`)
    .then(response => {
      const { request } = response.data.data;
      dispatch(fetchRequest(request));
      return response;
    })
    .catch(error => {
      dispatch(fetchRequestError(error.response));
    });

export const fetchAdminRequests = requests => ({
  type: FETCH_ADMIN_REQUESTS,
  requests
});

export const fetchAdminRequestsError = error => ({
  type: FETCH_ADMIN_REQUESTS_ERROR,
  error
});

export const startFetchAdminRequests = () => dispatch =>
  axios
    .get(`${config.apiUrl}${backendRoutes.ADMIN_REQUESTS}`)
    .then(response => {
      const { request } = response.data.data;
      if (request) {
        dispatch(fetchAdminRequests(request));
      }
    })
    .catch(error => dispatch(fetchAdminRequestsError(error.response)));

export const adminRequestApprove = request => ({
  type: MANAGE_ADMIN_REQUEST_APPROVE,
  request
});

export const adminRequestApproveError = error => ({
  type: MANAGE_ADMIN_REQUEST_APPROVE_ERROR,
  error
});

export const startAdminRequestApprove = id => dispatch =>
  axios
    .put(`${config.apiUrl}${backendRoutes.ADMIN_REQUESTS}/${id}/approve`)
    .then(response => {
      dispatch(adminRequestApprove(response.data.data.request));
      toastr.success('request approved');
    })
    .catch(error => {
      dispatch(adminRequestApproveError(error.response));
    });

export const adminRequestDisapprove = request => ({
  type: MANAGE_ADMIN_REQUEST_DISAPPROVE,
  request
});

export const adminRequestDisapproveError = error => ({
  type: MANAGE_ADMIN_REQUEST_DISAPPROVE_ERROR,
  error
});

export const startAdminRequestDisapprove = id => dispatch =>
  axios
    .put(`${config.apiUrl}${backendRoutes.ADMIN_REQUESTS}/${id}/disapprove`)
    .then(response => {
      dispatch(adminRequestApprove(response.data.data.request));
      toastr.success('request disapproved');
    })
    .catch(error => {
      dispatch(adminRequestApproveError(error.response));
    });

export const adminRequestResolve = request => ({
  type: MANAGE_ADMIN_REQUEST_RESOLVE,
  request
});

export const adminRequestResolveError = error => ({
  type: MANAGE_ADMIN_REQUEST_RESOLVE_ERROR,
  error
});

export const startAdminRequestResolve = id => dispatch =>
  axios
    .put(`${config.apiUrl}${backendRoutes.ADMIN_REQUESTS}/${id}/resolve`)
    .then(response => {
      dispatch(adminRequestApprove(response.data.data.request));
      toastr.success('request resolved');
    })
    .catch(error => {
      dispatch(adminRequestApproveError(error.response));
    });
