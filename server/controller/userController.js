import requests from '../seedData/request';

/**
 * @class Users
 */
class Users {
  /**
 * @return {Object} all user requests
 * @param {param} req
 * @param {param} res
 */
  static retrieveRequests(req, res) {
    if(requests.length === 0) {
      return res.status(200).json({
        status: 'fail',
        message: 'Sorry, you have not made any request'
      })
    } else {
      const myRequests = requests.map(request => Object.assign({}, request));
      return res.status(200).json({
        status: 'success',
        message: 'Your requests',
        myRequests
      });
    }
  }
}

export default Users;
