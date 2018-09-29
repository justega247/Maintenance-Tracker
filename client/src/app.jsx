import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Dashboard from './components/DashboardPage';
import NotFoundPage from './components/NotFoundPage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/auth/LoginPage';
import routes from '../src/constants/routes';
import SignupPage from './components/auth/SignupPage';

library.add(faCogs);

const Routes = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path={routes.SIGN_IN} component={LoginPage} />
        <Route exact path={routes.SIGN_UP}  component={SignupPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(Routes, document.getElementById('app'));
