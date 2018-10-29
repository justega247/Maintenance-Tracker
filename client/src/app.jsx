import React from 'react';
import ReactDOM from 'react-dom';
import 'toastr/build/toastr.css';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import setAuthorizationToken from './utils/authorization';
import setCurrentUserToStore from './utils/setCurrentUser';

library.add(faCogs);

const store = configureStore();

setAuthorizationToken();

setCurrentUserToStore(store);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
