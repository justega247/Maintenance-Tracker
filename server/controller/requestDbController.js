import pool from '../models/database';

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
    const getAllRequests = 'SELECT requests.type,requests.title,requests.description,requests.status, users.fullname AS requested_by FROM requests INNER JOIN users ON requests.user_id = users.id';

    pool.query(getAllRequests)
      .then(AllRequests => res.status(200).json({
        status: 'success',
        message: 'Here are the request(s), that have been made',
        requests: AllRequests.rows,
      }));
  }

  /**
 * @description it enables an admin set the state of a request from pending to approved
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static approveRequests(req, res) {
    const requestId = parseInt(req.params.requestId, 10);

    const findARequest = `SELECT * FROM requests WHERE requests.id = '${requestId}'`;
    const updateFoundRequestStatus = `UPDATE requests SET status = 'approved' WHERE requests.id = '${requestId}' RETURNING *`;

    pool.query(findARequest)
      .then((requestFound) => {
        if (requestFound.rowCount === 0) {
          return res.status(404).json({
            status: 'fail',
            message: 'Sorry, there is no request with that id',
          });
        }
        if (requestFound.rows[0].status !== 'pending') {
          return res.status(400).json({
            status: 'fail',
            message: 'Sorry, the status of this request is no longer pending',
          });
        }
        pool.query(updateFoundRequestStatus)
          .then(updatedRequest => res.status(200).json({
            status: 'success',
            message: 'You have successfully approved this request',
            request: updatedRequest.rows[0],
          }));
        return null;
      });
  }
}

export default Requests;
