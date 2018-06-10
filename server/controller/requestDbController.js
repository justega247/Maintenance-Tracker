import pool from '../models/database';
import { sendSuccess, sendMessage } from '../utils/utils';

/**
 * @class Requests
 */
class Requests {
  /**
 * @description it returns all the requests in the app to the admin
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static retrieveRequests(req, res) {
    const getAllRequests = 'SELECT requests.type,requests.title,requests.description,requests.status,requests.created_at, users.fullname AS requested_by FROM requests INNER JOIN users ON requests.user_id = users.id';

    pool.query(getAllRequests)
      .then(AllRequests => sendSuccess(res, 200, 'Here are the request(s), that have been made', AllRequests.rows));
  }

  /**
 * @description it enables an admin set the status of a request from pending to approved
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static approveRequests(req, res) {
    const requestId = parseInt(req.params.requestId, 10);
    const { request } = req.foundARequest;
    const updateFoundRequestStatus = `UPDATE requests SET status = 'approved' WHERE requests.id = '${requestId}' RETURNING *`;

    if (request.status !== 'pending') {
      sendMessage(res, 400, 'fail', 'Sorry, the status of this request is no longer pending');
      return null;
    }
    pool.query(updateFoundRequestStatus)
      .then(updatedRequest => sendSuccess(res, 200, 'You have successfully approved this request', updatedRequest.rows[0]));
    return null;
  }

  /**
 * @description it enables an admin set the status of a request to disapproved
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static disapproveRequests(req, res) {
    const requestId = parseInt(req.params.requestId, 10);
    const updateFoundRequestStatus = `UPDATE requests SET status = 'disapproved' WHERE requests.id = '${requestId}' RETURNING *`;

    pool.query(updateFoundRequestStatus)
      .then(updatedRequest => sendSuccess(res, 200, 'You have successfully disapproved this request', updatedRequest.rows[0]));
    return null;
  }

  /**
 * @description it enables an admin set the state of a request to resolved
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static resolveRequests(req, res) {
    const requestId = parseInt(req.params.requestId, 10);

    const updateFoundRequestState = `UPDATE requests SET state = 'resolved' WHERE requests.id = '${requestId}' RETURNING *`;

    pool.query(updateFoundRequestState)
      .then(updatedRequest => sendSuccess(res, 200, 'This request has been successfully resolved', updatedRequest.rows[0]));
    return null;
  }
}

export default Requests;
