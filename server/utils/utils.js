/**
 * @return {undefined}
 *
 * @param {object} response
 * @param {number} code - status code
 * @param {string} returnMessage
 * @param {object} returnObject
 */
const sendSuccess = (res, code, returnMessage, returnObject) => {
  res.status(code).json({
    data: {
      request: returnObject,
    },
    message: returnMessage,
    status: 'success',
  });
  res.end();
};

/**
 * @return {undefined}
 *
 * @param {object} response
 * @param {number} code - status code
 * @param {string} returnStatus
 * @param {string} returnMessage
 */
const sendMessage = (res, code, returnStatus, returnMessage) => {
  res.status(code).json({
    message: returnMessage,
    status: returnStatus,
  });
  res.end();
};

export {
  sendSuccess,
  sendMessage,
};
