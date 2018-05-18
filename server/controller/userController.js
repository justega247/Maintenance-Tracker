import requests from '../seedData/request';

/**
 * @class Users
 */
class Users {
  /**
 * @return {Object}
 * @param {param} req
 * @param {param} res
 * @description Returns all the requests made by a user
 */
  static retrieveRequests(req, res) {
    if (requests.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Sorry, you have not made any request',
        requests: [],
      });
    }
    const myRequests = requests.map(request => Object.assign({}, request));
    return res.status(200).json({
      status: 'success',
      message: 'Your requests, have been retrieved successfuly',
      myRequests,
    });
  }

  /**
 * @return {Object}
 * @param {param} req
 * @param {param} res
 * @description Returns a request made by a user
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
