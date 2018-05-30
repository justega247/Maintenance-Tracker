import Validator from 'validatorjs';

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
    const {
      username, fullname, email, password,
    } = req.body;

    const validation = new Validator({
      username,
      fullname,
      email,
      password,
    }, {
      username: 'required|string|min:3|max:12|alpha_num',
      fullname: ['required', 'string', 'min:4', 'max:40', 'regex:/([a-zA-Z]+)\\s([a-zA-Z]+)/'],
      email: 'required|string|email',
      password: 'required|min:6|max:12|string',
    });

    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      status: 'fail',
      errors: validation.errors.all(),
    });
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
    const { username, password } = req.body;
    const validation = new Validator({
      username,
      password,
    }, {
      username: 'required|string|min:3|max:12|alpha_num',
      password: 'required|min:6|max:12|string',
    });

    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      status: 'fail',
      errors: validation.errors.all(),
    });
  }
}

export default ValidateUser;
