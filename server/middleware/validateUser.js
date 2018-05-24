import validator from 'validator';
import isEmpty from 'lodash.isempty';

/**
 * @class Validate Users
 */
class ValidateUser {
  /**
   * validate user input on signUp
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static signUpDataValidation(req, res, next) {
    const error = {};
    let {
      username, fullname,
    } = req.body;
    const {
      email, password,
    } = req.body;
    username = username.trim();
    fullname = fullname.trim();
    const re = /\s/g;
    const userNameStr = username.toLowerCase().replace(re, '');
    const fullNameStr = fullname.toLowerCase().replace(re, '');

    if (!validator.isEmail(email.trim())) {
      error.email = 'Sorry, your email is invalid';
    }

    if (!validator.isAlphanumeric(userNameStr)
      || userNameStr === ''
      || userNameStr.length < 3) {
      error.username = 'Sorry, your username is invalid';
    }

    if (!password
        || password.trim() === ''
        || password.trim().length < 6) {
      error.password = 'Sorry, your password is invalid';
    }

    if (!fullNameStr || fullNameStr < 2 || /[^a-z]/i.test(fullNameStr)) {
      error.fullname = 'Sorry, your fullname is invalid';
    }

    if (!isEmpty(error)) {
      return res.status(400).json({
        status: 'fail',
        error,
      });
    }

    return next();
  }

  /**
   * validate user input on signIn
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static signInDataValidation(req, res, next) {
    const error = {};
    const { username, password } = req.body;
    if (!username || username.trim() === '') {
      error.username = 'Sorry, you have to specify a valid username';
    }

    if (!password || password.trim() === '') {
      error.password = 'Sorry, you have to specify a valid password';
    }

    if (!isEmpty(error)) {
      return res.status(400).json({
        status: 'fail',
        error,
      });
    }

    return next();
  }
}

export default ValidateUser;
