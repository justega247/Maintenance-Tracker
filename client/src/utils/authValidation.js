import Validator from 'validatorjs';

/**
 * @class Validate Users
 */
class ValidateUser {
  /**
   * validate user input on signIn
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
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
        password: 'required|min:6|max:12|string'
      },
      {
        'required.username': 'Sorry, you have to enter a :attribute.',
        'string.username': 'Sorry, the :attribute has to be a string value.',
        'min.username':
          'The :attribute is too short. Min length is :min characters.',
        'max.username':
          'The :attribute is too long. Max length is :max characters.',
        'alpha_num.username':
          'The :attribute can only contain alphanumeric characters.',
        'required.password': 'Sorry, you have to enter a :attribute.',
        'min.password':
          'The :attribute is too short. Min length is :min characters.',
        'max.password':
          'The :attribute is too long. Max length is :max characters.',
        'string.password': 'Sorry, the :attribute has to be a string value.'
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
}

export default ValidateUser;
