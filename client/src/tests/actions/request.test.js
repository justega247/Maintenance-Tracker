import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { addRequest, addRequestError, startAddRequest } from '../../actions/request';
import mockData from '../__mocks__/mockData';
import config from '../../config';
import { backendRoutes } from '../../constants/routes';
import mockCookieStorage from '../__mocks__/mockCookiesStorage';
import { ADD_REQUEST, ADD_REQUEST_ERROR } from '../../constants/actionTypes';


window.Cookies = mockCookieStorage;
const createMockStore = configureMockStore([thunk]);

describe('Request Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  test('should set up add request object', () => {
    const { request } = mockData;
    const action = addRequest(request);
    expect(action).toEqual({
      type: ADD_REQUEST,
      request,
    });
  });

  test('should set up add request error object', () => {
    const { requestError } = mockData;
    const action = addRequestError(requestError);
    expect(action).toEqual({
      type: ADD_REQUEST_ERROR,
      error: requestError,
    });
  });

  test('should add request to database and store', (done) => {
    const { request, requestResponse } = mockData;
    moxios.stubRequest(`${config.apiUrl}${backendRoutes.REQUESTS}`, {
      status: 201,
      response: requestResponse.data.data,
    });

    const expectedActions = [{
      type: ADD_REQUEST,
      request,
    }];
    const store = createMockStore({});
    store.dispatch(startAddRequest(request))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
