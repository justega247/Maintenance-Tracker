import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { frontendRoutes } from '../constants/routes';
import { logoutAction } from '../actions/auth';

export class Header extends Component {
  onLogout = () => {
    const { startLogout } = this.props;
    startLogout();
  }

  render() {
    const { auth, userId } = this.props;
    const RedirectionRoute = userId === 1 ? `${frontendRoutes.ADMIN_DASHBOARD}` : `${frontendRoutes.USER_DASHBOARD}`;

    return (
      <div>
        {
      auth ? (
        <header className="header auth__header">
          <Link className="auth__title" to={RedirectionRoute}>
            <span className="header__name">
          Maintenance Tracker <FontAwesomeIcon icon="cogs" />
            </span>
          </Link>
          <div className="nav__div">
            {userId !== 1 && <Link to={frontendRoutes.CREATE_REQUEST} className="nav__item">Create Request</Link>}
            <Link to={RedirectionRoute} className="nav__item">View Requests</Link>
            <Link to="#" className="nav__item logout__link" onClick={this.onLogout}>Logout</Link>
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
  }
}

Header.defaultProps = {
  startLogout: () => {},
  userId: undefined,
};

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  startLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  userId: state.auth.user.id,
});

const mapDispatchToProps = dispatch => ({
  startLogout: bindActionCreators(logoutAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
