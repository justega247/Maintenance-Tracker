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
}

export default Requests;
