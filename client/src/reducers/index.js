import { combineReducers } from 'redux';
import authReducer from './authReducer';
import requestReducer from './requestReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  requests: requestReducer,
});

export default rootReducer;
