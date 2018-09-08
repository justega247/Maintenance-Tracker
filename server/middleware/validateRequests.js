import Validator from 'validatorjs';

/**
 * @class Validate requests
 */
class ValidateRequests {
  /**
   * @description validate request input on creation
   *
   * @param {object} req
   * @param {object} res
   * @param {func} next
   *
   * @return {void}
   */
  static requestDataValidation(req, res, next) {
    let { title, type, description } = req.body;
    title = title.trim().toLowerCase();
    type = type.trim().toLowerCase();
    description = description.trim().toLowerCase();
    const validation = new Validator({
      type,
      title,
      description,
    }, {
      type: ['required', 'string', { in: ['repairs', 'maintenance'] }],
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

    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      status: 'fail',
      errors: validation.errors.all(),
    });
  }

  /**
  * @description validate request input on update
  *
  * @param {object} req
  * @param {object} res
  * @param {func} next
  *
  * @return {void}
  */
  static requestUpdateValidation(req, res, next) {
    const { type, title, description } = req.body;
    const validation = new Validator({
      type,
      title,
      description,
    }, {
      type: ['string', { in: ['repairs', 'maintenance'] }],
      title: ['string', 'min:4', 'max:40', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      description: ['string', 'min:20', 'max:300', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
    }, {
      in: 'The type specified has to be either repairs or maintenance, lowercased',
      'string.title': 'Sorry, the :attribute has to be a string value.',
      'min.title': 'The :attribute is too short. Min length is :min characters.',
      'max.title': 'The :attribute is too long. Max length is :max characters.',
      'regex.title': 'The title of your request contains invalid character(s)',
      'string.description': 'Sorry, the :attribute has to be a string value.',
      'min.description': 'The :attribute is too short. Min length is :min characters.',
      'max.description': 'The :attribute is too long. Max length is :max characters.',
      'regex.description': 'The :attribute of your request contains invalid character(s)',
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

export default ValidateRequests;
