import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { frontendRoutes } from '../constants/routes';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import UserRequestPage from '../components/UserRequestPage';
import AdminRequestPage from '../components/AdminRequestPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import CreateRequestPage from '../components/CreateRequestPage';
import RequestDetailsPage from '../components/UserRequestDetails';
import EditRequestForm from '../components/EditRequestForm';
import PrivateRoute from '../utils/PrivateRoute';


export const history = createHistory();

export default () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path={frontendRoutes.LANDING} component={LandingPage} />
        <Route exact path={frontendRoutes.SIGN_IN} component={LoginPage} />
        <Route exact path={frontendRoutes.SIGN_UP} component={SignupPage} />
        <PrivateRoute exact path={frontendRoutes.ADMIN_DASHBOARD} component={AdminRequestPage} />
        <PrivateRoute exact path={frontendRoutes.USER_DASHBOARD} component={UserRequestPage} />
        <PrivateRoute exact path={frontendRoutes.CREATE_REQUEST} component={CreateRequestPage} />
        <PrivateRoute exact path={frontendRoutes.VIEW_REQUEST} component={RequestDetailsPage} />
        <PrivateRoute exact path={frontendRoutes.EDIT_REQUEST} component={EditRequestForm} />
        <PrivateRoute component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
