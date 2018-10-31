import { ADD_REQUEST, ADD_REQUEST_ERROR, FETCH_REQUESTS } from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  const { type, request, requests } = action;
  switch (type) {
    case ADD_REQUEST:
      return [
        ...state,
        request,
      ];
    case ADD_REQUEST_ERROR:
      return [
        ...state,
      ];
    case FETCH_REQUESTS:
      return requests;
    default:
      return state;
  }
};
