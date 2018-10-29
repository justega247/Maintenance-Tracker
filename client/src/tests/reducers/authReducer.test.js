import authReducer from '../../reducers/authReducer';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FAIL,
  LOGOUT_USER,
} from '../../constants/actionTypes';
import mockData from '../__mocks__/mockData';

let initialState;
describe('Auth Reducer', () => {
  beforeEach(() => {
    initialState = {
      isAuthenticated: false,
      user: {},
      error: {},
    };
  });
  test('should setup default auth reducer', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  test('should remove the user details when logging out', () => {
    const action = {
      type: LOGOUT_USER,
    };

    const logoutResultState = authReducer({
      ...initialState,
      isAuthenticated: true,
    }, action);
    expect(logoutResultState).toEqual(initialState);
  });

  test('should set the current user', () => {
    const user = mockData.signUpDetails;
    const action = {
      type: SET_CURRENT_USER,
      user,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: true,
      user,
    });
  });

  test('should not set the current user', () => {
    const action = {
      type: SET_CURRENT_USER_FAIL,
      error: 'No user found with that username.',
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: 'No user found with that username.',
    });
  });
});
