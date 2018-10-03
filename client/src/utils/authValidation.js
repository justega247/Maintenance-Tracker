import Validator from 'validatorjs';

/**
 * @class Validate Users
 */
class ValidateUser {
  /**
   * validate user input on signIn
   *
   * @param {object} state
   *
   * @return {void}
   */
  static signInDataValidation(state) {
    const { username, password } = state;
    const validation = new Validator(
      {
        username,
        password
      },
      {
        username: 'required|string|min:3|max:12|alpha_num',
        password: 'required|min:6|max:50|string'
      },
      {
        'required.username': ':attribute field is required.',
        'string.username': 'The :attribute has to be a string value.',
        'min.username':
          'The :attribute is too short. Min length is :min characters.',
        'max.username':
          'The :attribute is too long. Max length is :max characters.',
        'alpha_num.username':
          'The :attribute can only contain alphanumeric characters.',
        'required.password': ':attribute field is required.',
        'min.password':
          'The :attribute is too short. Min length is :min characters.',
        'max.password':
          'The :attribute is too long. Max length is :max characters.',
        'string.password': 'The :attribute has to be a string value.'
      }
    );

    let validationErrors = {
      hasErrors: false,
      errors: {},
    };
    if (validation.fails()) {
      validationErrors.errors = validation.errors.all();
      validationErrors.hasErrors = true;
      return validationErrors;
    }
    return validationErrors;
  }

  /**
   * validate user input on signUp
   *
   * @param {object} state
   *
   * @return {void}
   */
  static signUpDataValidation(state) {
    const {
      username, fullname, email, password,
    } = state;

    const validation = new Validator({
      username,
      fullname,
      email,
      password,
    }, {
      username: 'required|string|min:3|max:12|alpha_num',
      fullname: ['required', 'string', 'min:4', 'max:50', 'regex:/^([a-z\']+(-| )?)+$/i'],
      email: 'required|string|email',
      password: 'required|min:6|max:50|string',
    }, {
      'required.username': ':attribute field is required.',
      'string.username': 'The :attribute has to be a string value.',
      'min.username': 'The :attribute is too short. Min length is :min characters.',
      'max.username': 'The :attribute is too long. Max length is :max characters.',
      'alpha_num.username': 'The :attribute can only contain alphanumeric characters.',
      'required.fullname': ':attribute is required.',
      'string.fullname': 'The :attribute has to be a string value.',
      'min.fullname': 'The :attribute is too short. Min length is :min characters.',
      'max.fullname': 'The :attribute is too long. Max length is :max characters.',
      'regex.fullname': 'Your :attribute can only contain alphabets, hyphen and an apostrophe',
      'required.email': 'Please you have to specify a valid :attribute so we can contact you.',
      'string.email': 'The :attribute has to be a string value.',
      'email.email': 'Please enter a valid :attribute address.',
      'required.password': ':attribute field is required.',
      'min.password': 'The :attribute is too short. Min length is :min characters.',
      'max.password': 'The :attribute is too long. Max length is :max characters.',
      'string.password': 'The :attribute has to be a string value.',
    });

    let validationErrors = {
      hasErrors: false,
      errors: {},
    };
    if (validation.fails()) {
      validationErrors.errors = validation.errors.all();
      validationErrors.hasErrors = true;
      return validationErrors;
    }
    return validationErrors;
  }
}

export default ValidateUser;
