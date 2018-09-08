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
    }, {
      'required.username': 'Sorry, you have to enter a :attribute.',
      'string.username': 'Sorry, the :attribute has to be a string value.',
      'min.username': 'The :attribute is too short. Min length is :min characters.',
      'max.username': 'The :attribute is too long. Max length is :max characters.',
      'alpha_num.username': 'The :attribute can only contain alphanumeric characters.',
      'required.fullname': 'Sorry, you have to enter your :attribute.',
      'string.fullname': 'Sorry, the :attribute has to be a string value.',
      'min.fullname': 'The :attribute is too short. Min length is :min characters.',
      'max.fullname': 'The :attribute is too long. Max length is :max characters.',
      'regex.fullname': 'The :attribute you have entered contains invalid character(s).',
      'required.email': 'Please you have to specify a valid :attribute so we can contact you.',
      'string.email': 'Sorry, the :attribute has to be a string value.',
      'email.email': 'Please enter a valid :attribute address.',
      'required.password': 'Sorry, you have to enter a :attribute.',
      'min.password': 'The :attribute is too short. Min length is :min characters.',
      'max.password': 'The :attribute is too long. Max length is :max characters.',
      'string.password': 'Sorry, the :attribute has to be a string value.',
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
    }, {
      'required.username': 'Sorry, you have to enter a :attribute.',
      'string.username': 'Sorry, the :attribute has to be a string value.',
      'min.username': 'The :attribute is too short. Min length is :min characters.',
      'max.username': 'The :attribute is too long. Max length is :max characters.',
      'alpha_num.username': 'The :attribute can only contain alphanumeric characters.',
      'required.password': 'Sorry, you have to enter a :attribute.',
      'min.password': 'The :attribute is too short. Min length is :min characters.',
      'max.password': 'The :attribute is too long. Max length is :max characters.',
      'string.password': 'Sorry, the :attribute has to be a string value.',
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
