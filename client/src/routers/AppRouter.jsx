import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { frontendRoutes } from '../constants/routes';
import NotFoundPage from '../components/NotFoundPage';
import LandingPage from '../components/LandingPage';
import UserRequestPage from '../components/UserRequestPage';
import AdminRequestPage from '../components/AdminRequestPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';

export const history = createHistory();

export default () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path={frontendRoutes.LANDING} component={LandingPage} />
        <Route exact path={frontendRoutes.SIGN_IN} component={LoginPage} />
        <Route exact path={frontendRoutes.SIGN_UP} component={SignupPage} />
        <Route exact path={frontendRoutes.ADMIN_DASHBOARD} component={AdminRequestPage} />
        <Route exact path={frontendRoutes.USER_DASHBOARD} component={UserRequestPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
