import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Header";
import Button from "../common/Button";
import ValidateUser from "../../utils/authValidation";
import routes from "../../constants/routes";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value
    }));
  };


  onSubmit = event => {
    event.preventDefault();

    const { errors, hasErrors } = ValidateUser.signInDataValidation(this.state);
    this.setState(() => ({
      errors
    }));

    if (!hasErrors) {
      const { username, password } = this.state;
      this.props.startUserSignIn({ username, password });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Header />
        <div>
          <form onSubmit={this.onSubmit} className="login__form">
            <div className="login__body">
              <div>
                <label htmlFor="username">
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
                  errors.username.map((error, index) => (
                    <div className="form__error" key={index}>
                      {error}
                    </div>
                  ))}
              </div>
              <div>
                <label htmlFor="password">
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
                  errors.password.map((error, index) => (
                    <div className="form__error" key={index}>
                      {error}
                    </div>
                  ))}
              </div>
              <div>
                <Button className="button--signin" type="submit" text="Login" />
              </div>
              <div className="login__extra">
                <Link className="login__extra-item" to="#">
                  Forgot Password?
                </Link>
                <Link className="login__extra-item" to={routes.SIGN_UP}>
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
  startUserSignIn: () => {}
};

LoginPage.propTypes = {
  startUserSignIn: PropTypes.func
};

export default LoginPage;
