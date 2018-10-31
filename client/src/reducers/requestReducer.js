import { ADD_REQUEST, ADD_REQUEST_ERROR } from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  const { type, request } = action;
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
    default:
      return state;
  }
};
