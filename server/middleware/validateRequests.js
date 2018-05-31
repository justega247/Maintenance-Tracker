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
    const {
      type, title, description,
    } = req.body;

    const validation = new Validator({
      type,
      title,
      description,
    }, {
      type: ['required', { in: ['repairs', 'maintenance'] }],
      title: ['required', 'string', 'min:4', 'max:40', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      description: ['required', 'string', 'min:20', 'max:300', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
    }, {
      in: 'The type specified has to be either repairs or maintenance',
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
    const {
      type, title, description,
    } = req.body;

    const validation = new Validator({
      type,
      title,
      description,
    }, {
      type: [{ in: ['repairs', 'maintenance'] }],
      title: ['string', 'min:4', 'max:40', 'regex:/^[a-z\\d\\-_,.*()!\\s]+$/i'],
      description: ['string', 'min:20', 'max:300', 'regex:/^[a-z\\d\\-_,.*()!?\\s]+$/i'],
    }, {
      in: 'The type specified has to be either repairs or maintenance',
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
