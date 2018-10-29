import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';


const middleware = process.env.NODE_ENV
 === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

// Store creation
export default () => {
  const store = createStore(
    rootReducer,
    middleware,
  );
  return store;
};
