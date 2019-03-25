import {
  ADD_REQUEST,
  ADD_REQUEST_ERROR,
  FETCH_REQUESTS,
  FETCH_ADMIN_REQUESTS,
  FETCH_REQUEST,
  EDIT_REQUEST,
  FETCH_REQUESTS_ERROR,
  FETCH_ADMIN_REQUESTS_ERROR,
  FETCH_REQUEST_ERROR,
  EDIT_REQUEST_ERROR
} from '../constants/actionTypes';

const initialState = {
  requests: [],
  request: {},
  update: {}
};

export default (state = initialState, action) => {
  const { type, request, requests } = action;
  switch (type) {
    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, ...request]
      };
    case ADD_REQUEST_ERROR:
      return {
        ...state
      };
    case FETCH_REQUESTS:
      return {
        ...state,
        requests
      };
    case FETCH_REQUEST:
      return {
        ...state,
        request
      };
    case FETCH_REQUESTS_ERROR:
      return {
        ...state
      };
    case FETCH_REQUEST_ERROR:
      return {
        ...state
      };
    case EDIT_REQUEST:
      return {
        ...state,
        update: request
      };
    case EDIT_REQUEST_ERROR:
      return {
        ...state
      };
    case FETCH_ADMIN_REQUESTS:
      return {
        ...state,
        requests
      };
    case FETCH_ADMIN_REQUESTS_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
};
