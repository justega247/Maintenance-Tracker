import requestReducer from '../../reducers/requestReducer';
import { ADD_REQUEST, ADD_REQUEST_ERROR } from '../../constants/actionTypes';
import mockData from '../__mocks__/mockData';

let initialState;
describe('Request Reducer', () => {
  beforeEach(() => {
    initialState = [];
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
    expect(state).toEqual([
      ...initialState,
      request,
    ]);
  });

  test('should not add a request when unsuccessful', () => {
    const { requestError } = mockData;
    const action = {
      type: ADD_REQUEST_ERROR,
      error: requestError,
    };

    const state = requestReducer(initialState, action);
    expect(state).toEqual([
      ...initialState,
    ]);
  });
});
