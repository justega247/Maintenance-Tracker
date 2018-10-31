import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import ValidateUser from '../../utils/authValidation';
import { frontendRoutes } from '../../constants/routes';
import { startUserSignIn } from '../../actions/auth';

export class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  onSubmit = (event) => {
    event.preventDefault();

    const { errors, hasErrors } = ValidateUser.signInDataValidation(this.state);
    this.setState(() => ({
      errors,
    }));

    if (!hasErrors) {
      const { username, password } = this.state;
      const { startUserLogin } = this.props;
      startUserLogin({ username, password });
    }
  };


  render() {
    const { errors } = this.state;
    const { auth, userId } = this.props;
    const RedirectionRoute = userId === 1 ? `${frontendRoutes.ADMIN_DASHBOARD}` : `${frontendRoutes.USER_DASHBOARD}`;
    if (auth) {
      return <Redirect to={RedirectionRoute} />;
    }

    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit} className="auth__form">
            <div className="auth__body">
              <div>
                <label htmlFor="username" className="label">
                  Username:
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="enter your username"
                      className="form__input"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </div>
                </label>
                {errors.username &&
                  errors.username.map(error => (
                    <div className="form__error" key={error}>
                      {error}
                    </div>
                  ))}
              </div>
              <div>
                <label htmlFor="password" className="label">
                  Password:
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="enter your password"
                      className="form__input"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                </label>
                {errors.password &&
                  errors.password.map(error => (
                    <div className="form__error" key={error}>
                      {error}
                    </div>
                  ))}
              </div>
              <div>
                <Button className="button--big" type="submit" text="Login" />
              </div>
              <div className="auth__extra">
                <div className="auth__extra-item">
                  Yet to create an account?
                </div>
                <Link className="auth__extra-item" to={frontendRoutes.SIGN_UP}>
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  startUserLogin: () => {},
  auth: false,
  userId: undefined,
};

LoginPage.propTypes = {
  startUserLogin: PropTypes.func,
  auth: PropTypes.bool,
  userId: PropTypes.number,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  userId: state.auth.user.id,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  startUserLogin: bindActionCreators(startUserSignIn, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
