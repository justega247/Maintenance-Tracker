import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Button from '../common/Button';
import ValidateUser from '../../utils/authValidation';
import { frontendRoutes } from '../../constants/routes';

class SignupPage extends Component {
  state = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
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
      this.props.startUserSignUp({
        username, fullname, email, password,
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Header />
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
  startUserSignUp: () => {},
};

SignupPage.propTypes = {
  startUserSignUp: PropTypes.func,
};

export default SignupPage;