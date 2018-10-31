import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { frontendRoutes } from '../constants/routes';
import Button from './common/Button';
import { logoutAction } from '../actions/auth';

export class Header extends Component {
  onLogout = () => {
    const { startLogout } = this.props;
    startLogout();
  }

  render() {
    const { auth, userId } = this.props;
    return (
      <div>
        {
      auth ? (
        <header className="header auth__header">
          <Link className="auth__title" to="/">
            <span>
          Maintenance Trackers <FontAwesomeIcon icon="cogs" />
            </span>
          </Link>
          <div className="nav__div">
            {userId !== 1 && <Link to={frontendRoutes.CREATE_REQUEST} className="nav__item">Create Request</Link>}
            <Link to={frontendRoutes.VIEW_REQUESTS} className="nav__item">View Request</Link>
            <Button
              className="button--login"
              type="button"
              text="Logout"
              onClick={this.onLogout}
            />
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
