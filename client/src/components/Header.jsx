import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { frontendRoutes } from '../constants/routes';

export const Header = ({ auth, userId }) => (
  <div>
    {
      auth ? (
        <header className="header">
          <Link className="header__title" to="/">
            <span>
          Maintenance Trackers <FontAwesomeIcon icon="cogs" />
            </span>
          </Link>
          <div>
            {userId !== 1 && <Link to={frontendRoutes.CREATE_REQUEST}>Create Request</Link>}
            <Link to={frontendRoutes.VIEW_REQUESTS}>View Request</Link>
            <button>Logout</button>
          </div>
        </header>
      ) : (
        <header className="header">
          <Link className="header__title" to="/">
            <span>
              Maintenance Tracker <FontAwesomeIcon icon="cogs" />
            </span>
          </Link>
        </header>
      )
    }
  </div>
);

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  userId: state.auth.user.id,
});

export default connect(mapStateToProps)(Header);
