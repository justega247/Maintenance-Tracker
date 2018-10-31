import { combineReducers } from 'redux';
import authReducer from './authReducer';
import requestReducer from './requestReducer';
import { LOGOUT_USER } from '../constants/actionTypes';

const appReducer = combineReducers({
  auth: authReducer,
  requests: requestReducer,
});

const initialState = appReducer({}, {});

export const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;

