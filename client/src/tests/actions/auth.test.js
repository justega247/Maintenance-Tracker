import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import { backendRoutes } from '../../constants/routes';
import config from '../../config';
import { startUserSignIn } from '../../actions/auth';
import { SET_CURRENT_USER, SET_CURRENT_USER_FAIL } from '../../constants/actionTypes';
import mockData from '../__mocks__/mockData';
import mockCookieStorage from '../__mocks__/mockCookiesStorage';

window.Cookies = mockCookieStorage;
const createMockStore = configureMockStore([thunk]);
let history;
describe('Authentication Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  history = { push: jest.fn() };

  test('should setup setCurrentUser object', (done) => {
    const { authResponse, loginData } = mockData;
    moxios.stubRequest(`${config.apiUrl}${backendRoutes.LOGIN}`, {
      status: 200,
      response: authResponse.data.data,
    });

    const expectedActions = [{
      type: SET_CURRENT_USER,
      user: jwt.decode(authResponse.data.data.user.token),
    }];
    const store = createMockStore({});
    store.dispatch(startUserSignIn(loginData, history))
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
    store.dispatch(startUserSignIn(loginData, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
