import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/DashboardPage';

const jsx = (
  <Dashboard />
);

const appRoot = document.getElementById('app');
ReactDOM.render(jsx, appRoot);
