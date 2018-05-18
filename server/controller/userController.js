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
}

export default Users;
