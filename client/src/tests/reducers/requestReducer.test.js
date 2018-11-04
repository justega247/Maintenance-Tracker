import requestReducer from '../../reducers/requestReducer';
import { ADD_REQUEST, ADD_REQUEST_ERROR, FETCH_REQUEST, FETCH_REQUESTS, FETCH_REQUEST_ERROR, FETCH_REQUESTS_ERROR, EDIT_REQUEST, EDIT_REQUEST_ERROR } from '../../constants/actionTypes';
import mockData from '../__mocks__/mockData';

let initialState;
describe('Request Reducer', () => {
  beforeEach(() => {
    initialState = {
      request: {},
      requests: [],
      update: {},
    };
  });

  test('should setup default request reducer', () => {
    const state = requestReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('should add a request when successful', () => {
    const { request } = mockData;
    const action = {
      type: ADD_REQUEST,
      request,
    };

    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      requests: [
        ...initialState.request,
        ...request,
      ],
    });
  });

  test('should not add a request when unsuccessful', () => {
    const { requestError } = mockData;
    const action = {
      type: ADD_REQUEST_ERROR,
      error: requestError,
    };

    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });

  test('should fetch all requests when successful', () => {
    const { request } = mockData;
    const action = {
      type: FETCH_REQUESTS,
      requests: request,
    };
    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      requests: request,
    });
  });

  test('should fetch all requests when successful', () => {
    const { requestError } = mockData;
    const action = {
      type: FETCH_REQUESTS_ERROR,
      error: requestError,
    };
    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });

  test('should fetch a request when successful', () => {
    const { request } = mockData;
    const action = {
      type: FETCH_REQUEST,
      request,
    };
    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      request,
    });
  });

  test('should not fetch a request when unsuccessful', () => {
    const { requestError } = mockData;
    const action = {
      type: FETCH_REQUEST_ERROR,
      error: requestError,
    };
    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });

  test('should update a request when successful', () => {
    const { request } = mockData;
    const action = {
      type: EDIT_REQUEST,
      request,
    };
    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      update: request,
    });
  });

  test('should not update a request when unsuccessful', () => {
    const { requestError } = mockData;
    const action = {
      type: EDIT_REQUEST_ERROR,
      error: requestError,
    };
    const state = requestReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
    });
  });
});
