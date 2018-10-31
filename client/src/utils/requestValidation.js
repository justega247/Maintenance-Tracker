import Validator from 'validatorjs';

/**
 * @class Validate requests
 */
class ValidateRequests {
  /**
   * @description validate request input on creation
   *
   * @param {object} state
   *
   * @return {void}
   */
  static requestDataValidation(state) {
    let { title, description } = state;
    title = title.trim().toLowerCase();
    description = description.trim().toLowerCase();
    const validation = new Validator({
      title,
      description,
    }, {
      title: ['required', 'string', 'min:4', 'max:60'],
      description: ['required', 'string', 'min:15', 'max:300'],
    }, {
      in: 'The type specified has to be either repairs or maintenance.',
      'min.title': 'The :attribute is too short. Min length is :min characters.',
      'max.title': 'The :attribute is too long. Max length is :max characters.',
      'required.title': 'Sorry, you have to specify a title for your request',
      'required.description': 'Sorry, you have to specify a description for your request',
      'min.description': 'The :attribute is too short. Min length is :min characters.',
      'max.description': 'The :attribute is too long. Max length is :max characters.',
    });

    const validationErrors = {
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

export default ValidateRequests;
