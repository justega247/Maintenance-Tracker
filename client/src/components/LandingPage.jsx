import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Button from './common/Button';
import { frontendRoutes } from '../constants/routes';

const LandingPage = () => (
  <div>
    <Header />
    <div className="landing__image">
      <div className="landing__quote">
        <h1>No need to wait till something breaks</h1>
      </div>
      <div className="landing__button">
        <Link to={frontendRoutes.SIGN_IN}>
          <Button className="button button--login" text="login" />
        </Link>
        <Link to={frontendRoutes.SIGN_UP}>
          <Button
            className="button button--signup"
            text="create your account"
          />
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
