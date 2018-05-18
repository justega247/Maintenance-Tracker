import requests from '../seedData/request';

/**
 * @class Users
 */
class Users {
  /**
 * @description Returns all the requests made by a user
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static retrieveRequests(req, res) {
    const myRequests = [];
    if (requests.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Sorry, you have not made any request',
        requests: [],
      });
    }
    myRequests.push(...requests);
    return res.status(200).json({
      status: 'success',
      message: 'Your requests, have been retrieved successfuly',
      requests: myRequests,
    });
  }

  /**
 * @description Returns a request made by a user
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static returnRequest(req, res) {
    const requestId = parseInt(req.params.requestId, 10);
    const request = requests.find(one => one.id === requestId);

    if (request) {
      return res.status(200).json({
        status: 'success',
        message: 'Your request has been found',
        request,
      });
    }
    return res.status(404).json({
      status: 'fail',
      message: 'Sorry, there is no request with that id',
    });
  }
}

export default Users;
