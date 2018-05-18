import isEmpty from 'lodash.isempty';

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
    const error = {};
    let { title, description } = req.body;
    title = title.trim();
    description = description.trim();
    const re = /\s/g;
    const titleStr = title.toLowerCase().replace(re, '');
    const descriptionStr = description.toLowerCase().replace(re, '');

    if (!title || /[^a-z,;'".!]/i.test(titleStr) || titleStr.length < 2) {
      error.title = 'Sorry, the title you have entered is invalid';
    }

    if (!description || /[^a-z,;'".!]/i.test(descriptionStr) || descriptionStr.length < 20) {
      error.description = 'Sorry, the description you have entered is invalid';
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

export default ValidateRequests;
