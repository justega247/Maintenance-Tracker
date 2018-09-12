import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Dashboard from './components/DashboardPage';
import AuthForm from './components/AuthPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signup" component={AuthForm} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
