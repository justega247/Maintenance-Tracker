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
      message: 'Your requests have been retrieved successfuly',
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
    const request = requests
      .find(singleRequest => singleRequest.id === requestId);

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

  /**
 * @description Create a new request
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static addRequest(req, res) {
    const { title, type, description } = req.body;
    const request = requests.find(singleRequest => (singleRequest.title === title &&
      singleRequest.description === description));
    if (request) {
      return res.status(400).json({
        status: 'fail',
        message: 'Sorry, you already have a request with those details',
      });
    }
    requests.push({
      id: requests[requests.length - 1].id + 1,
      title,
      description,
      type,
    });
    return res.status(201).json({
      status: 'success',
      message: 'Your request was created successfully',
      request: requests[requests.length - 1],
    });
  }
}

export default Users;
