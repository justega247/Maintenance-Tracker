import pool from '../models/database';

const findARequestById = (req, res, next) => {
  const requestId = parseInt(req.params.requestId, 10);

  const findARequest = `SELECT * FROM requests WHERE requests.id = '${requestId}'`;

  pool.query(findARequest)
    .then((requestFound) => {
      if (requestFound.rowCount === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'Sorry, there is no request with that id',
        });
      }
      req.foundARequest = {
        request: requestFound.rows[0],
      };
      return next();
    });
};

/**
 * @return {undefined}
 *
 * @param {object} res
 * @param {number} code - status code
 * @param {string} returnMessage
 * @param {object} returnObject
 */
const sendSuccess = (res, code, returnMessage, returnObject) => {
  res.status(code).json({
    status: 'success',
    message: returnMessage,
    request: returnObject,
  });
  res.end();
};

/**
 * @return {undefined}
 *
 * @param {object} res
 * @param {number} code - status code
 * @param {string} returnStatus
 * @param {string} returnMessage
 */
const sendMessage = (res, code, returnStatus, returnMessage) => {
  res.status(code).json({
    status: returnStatus,
    message: returnMessage,
  });
  res.end();
};

export {
  findARequestById,
  sendSuccess,
  sendMessage,
};
