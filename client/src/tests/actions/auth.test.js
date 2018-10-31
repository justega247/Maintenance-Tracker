import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import { backendRoutes } from '../../constants/routes';
import config from '../../config';
import { startUserSignIn, startUserSignUp, logoutCurrentUser, setCurrentUserError, setCurrentUser } from '../../actions/auth';
import { SET_CURRENT_USER, SET_CURRENT_USER_FAIL, LOGOUT_USER } from '../../constants/actionTypes';
import mockData from '../__mocks__/mockData';
import mockCookieStorage from '../__mocks__/mockCookiesStorage';

window.Cookies = mockCookieStorage;
const createMockStore = configureMockStore([thunk]);

describe('Authentication Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  test('should setup setCurrentUser object', (done) => {
    const { authResponse, loginData } = mockData;
    moxios.stubRequest(`${config.apiUrl}${backendRoutes.LOGIN}`, {
      status: 200,
      response: authResponse.data,
    });

    const expectedActions = [{
      type: SET_CURRENT_USER,
      user: jwt.decode(authResponse.data.data.user.token),
    }];
    const store = createMockStore({});
    store.dispatch(startUserSignIn(loginData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  test('creates SET_CURRENT_USER_FAIL when login is not successful', (done) => {
    const { errorResponse, loginData } = mockData;
    moxios.stubRequest(`${config.apiUrl}${backendRoutes.LOGIN}`, {
      status: 404,
      response: errorResponse,
    });

    const expectedActions = [{
      type: SET_CURRENT_USER_FAIL,
      error: errorResponse,
    }];
    const store = createMockStore({});
    store.dispatch(startUserSignIn(loginData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  test('creates SET_CURRENT_USER when signup is successful', (done) => {
    const { authResponse, signUpDetails } = mockData;
    moxios.stubRequest(`${config.apiUrl}${backendRoutes.SIGN_UP}`, {
      status: 201,
      response: authResponse.data,
    });

    const expectedActions = [{
      type: SET_CURRENT_USER,
      user: jwt.decode(authResponse.data.data.user.token),
    }];
    const store = createMockStore({});
    store.dispatch(startUserSignUp(signUpDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  test('creates LOGOUT_USER action', () => {
    const expectedActions = [{
      type: LOGOUT_USER,
    }];
    const store = createMockStore({});
    store.dispatch(logoutCurrentUser());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should set up set current user action object', () => {
    const { currentUser, token } = mockData;
    const action = setCurrentUser(jwt.decode(token));
    expect(action).toEqual({
      type: SET_CURRENT_USER,
      user: currentUser,
    });
  });

  test('should set up set current user error action object', () => {
    const action = setCurrentUserError('error');
    expect(action).toEqual({
      type: SET_CURRENT_USER_FAIL,
      error: 'error',
    });
  });
});
