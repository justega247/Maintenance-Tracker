import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { addRequest, addRequestError, startAddRequest, fetchRequests, fetchRequestsError, editRequest, editRequestError, fetchRequest, fetchRequestError, startFetchRequests, startFetchRequest, startEditRequest } from '../../actions/request';
import mockData from '../__mocks__/mockData';
import mockCookieStorage from '../__mocks__/mockCookiesStorage';
import { ADD_REQUEST, ADD_REQUEST_ERROR, FETCH_REQUESTS, FETCH_REQUESTS_ERROR, EDIT_REQUEST, EDIT_REQUEST_ERROR, FETCH_REQUEST, FETCH_REQUEST_ERROR } from '../../constants/actionTypes';


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

  test('should add request to the database', (done) => {
    const { requestResponse, request } = mockData;
    moxios.wait(() => {
      const requested = moxios.requests.mostRecent();
      requested.respondWith({
        status: 201,
        response: requestResponse.data,
      });
    });
    const expectedActions = {
      type: ADD_REQUEST,
      request: requestResponse.data.data.request,
    };
    const store = createMockStore({}, done);
    return store.dispatch(startAddRequest(request)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions);
      done();
    });
  });

  test('should set up fetch requests object', () => {
    const { request } = mockData;
    const action = fetchRequests(request);
    expect(action).toEqual({
      type: FETCH_REQUESTS,
      requests: request,
    });
  });

  test('should set up fetch requests error object', () => {
    const { requestError } = mockData;
    const action = fetchRequestsError(requestError);
    expect(action).toEqual({
      type: FETCH_REQUESTS_ERROR,
      error: requestError,
    });
  });

  test('should fetch requests from the database', (done) => {
    const { requestsResponse } = mockData;
    moxios.wait(() => {
      const requested = moxios.requests.mostRecent();
      requested.respondWith({
        status: 200,
        response: requestsResponse.data,
      });
    });
    const expectedActions = [
      {
        type: FETCH_REQUESTS,
        requests: requestsResponse.data.data.request,
      },
    ];
    const store = createMockStore({}, done);
    return store.dispatch(startFetchRequests()).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });

  test('should set up fetch request object', () => {
    const { request } = mockData;
    const action = fetchRequest(request);
    expect(action).toEqual({
      type: FETCH_REQUEST,
      request,
    });
  });

  test('should set up fetch request error object', () => {
    const { requestError } = mockData;
    const action = fetchRequestError(requestError);
    expect(action).toEqual({
      type: FETCH_REQUEST_ERROR,
      error: requestError,
    });
  });

  test('should fetch a request from the database', (done) => {
    const { oneRequestResponse } = mockData;
    moxios.wait(() => {
      const requested = moxios.requests.mostRecent();
      requested.respondWith({
        status: 200,
        response: oneRequestResponse.data,
      });
    });
    const expectedActions = {
      type: FETCH_REQUEST,
      request: oneRequestResponse.data.data.request,
    };
    const store = createMockStore({}, done);
    return store.dispatch(startFetchRequest(3)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions);
      done();
    });
  });

  test('should set up edit request object', () => {
    const { request } = mockData;
    const action = editRequest(request);
    expect(action).toEqual({
      type: EDIT_REQUEST,
      request,
    });
  });

  test('should set up fetch requests error object', () => {
    const { requestError } = mockData;
    const action = editRequestError(requestError);
    expect(action).toEqual({
      type: EDIT_REQUEST_ERROR,
      error: requestError,
    });
  });

  test('should edit request in the database', (done) => {
    const { requestsResponse } = mockData;
    const updates = {
      description: 'Chess is a board game i like',
    };
    moxios.wait(() => {
      const requested = moxios.requests.mostRecent();
      requested.respondWith({
        status: 200,
        response: requestsResponse.data,
      });
    });
    const expectedActions =
      {
        type: EDIT_REQUEST,
        request: requestsResponse.data.data.request,
      };
    const store = createMockStore({}, done);
    return store.dispatch(startEditRequest(3, updates)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions);
      done();
    });
  });
});
