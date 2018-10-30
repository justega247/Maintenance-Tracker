import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import ValidateUser from '../../utils/authValidation';
import { frontendRoutes } from '../../constants/routes';
import { startUserSignUp } from '../../actions/auth';


export class SignupPage extends Component {
  state = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { errors, hasErrors } = ValidateUser.signUpDataValidation(this.state);
    this.setState(() => ({
      errors,
    }));

    if (!hasErrors) {
      const {
        username, fullname, email, password,
      } = this.state;
      const { startUserRegister, history } = this.props;
      startUserRegister({
        username, fullname, email, password,
      }, history);
    }
  };

  render() {
    const { errors } = this.state;

    return (
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
              <label htmlFor="fullname" className="label">
                Fullname:
                <div>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="enter your fullname"
                    className="form__input"
                    value={this.state.fullname}
                    onChange={this.onChange}
                  />
                </div>
              </label>
              {errors.fullname &&
                errors.fullname.map(error => (
                  <div className="form__error" key={error}>
                    {error}
                  </div>
                ))}
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email:
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    className="form__input"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
              </label>
              {errors.email &&
                errors.email.map(error => (
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
              <Button className="button--big" type="submit" text="Signup" />
            </div>
            <div>
              <h4>
                Already have an account?{' '}
                <Link className="auth__extra-item" to={frontendRoutes.SIGN_IN}>
                  Login
                </Link>
              </h4>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SignupPage.defaultProps = {
  startUserRegister: () => {},
};

SignupPage.propTypes = {
  startUserRegister: PropTypes.func,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  startUserRegister: bindActionCreators(startUserSignUp, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
