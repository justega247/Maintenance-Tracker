import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { hashSync } from 'bcrypt-nodejs';
import pool from '../models/database';
import { sendSuccess, sendMessage } from '../utils/utils';

dotenv.config();

const { SECRET, TOKEN_EXPIRATION_TIME } = process.env;

/**
 * @class Users
 */
class Users {
  /**
 * @description it returns a newly created user
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static addUser(req, res) {
    const { email, password } = req.body;
    let { username, fullname } = req.body;
    username = username.trim().toLowerCase();
    fullname = fullname.trim().toLowerCase();

    const hashedPassword = hashSync(password);

    const newUser = `INSERT INTO users (username,fullname,email,password)VALUES ('${username}','${fullname}','${email}','${hashedPassword}') RETURNING id, username, fullname;`;
    const checkDetails = `SELECT username, email FROM users WHERE users.username = '${username}' OR users.email = '${email}'`;

    pool.query(checkDetails)
      .then((detailsFound) => {
        if (detailsFound.rowCount !== 0) {
          return sendMessage(res, 409, 'fail', 'Sorry, the username and/or email you supplied, already exists');
        }
        return pool.query(newUser)
          .then((createdUser) => {
            const token = sign(
              {
                id: createdUser.rows[0].id,
              },
              SECRET,
              {
                expiresIn: TOKEN_EXPIRATION_TIME,
              },
            );
            res.header('authorization', token).status(201).json({
              data: {
                user: {
                  id: createdUser.rows[0].id,
                  name: createdUser.rows[0].fullname,
                  username: createdUser.rows[0].username,
                  token,
                },
              },
              message: 'Account successfully created',
              status: 'success',
            });
          });
      });
  }

  /**
 *@description it returns a registered user on login with valid credentials
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static signinUser(req, res) {
    const { id, username } = req.user;
    const token = sign(
      { id }, SECRET,
      { expiresIn: TOKEN_EXPIRATION_TIME },
    );
    res.header('authorization', token).status(200).json({
      data: {
        user: {
          id,
          username,
          token,
        },
      },
      message: 'You signed in successfully',
      status: 'success',
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
    const { id } = req.user;
    let { title, type, description } = req.body;
    title = title.trim().toLowerCase();
    type = type.trim().toLowerCase();
    description = description.trim().toLowerCase();

    const getUserRequests = `SELECT * FROM requests WHERE requests.user_id = '${id}'`;
    const requestDetails = `INSERT INTO requests (user_id,title,type,description) VALUES('${id}','${title}','${type}','${description}') RETURNING id, title, type, description, user_id;`;

    pool.query(getUserRequests)
      .then((userRequests) => {
        if (userRequests.rowCount !== 0) {
          const request = userRequests.rows.find(singleRequest => (singleRequest.title === title &&
          singleRequest.description === description && singleRequest.type === type));
          if (request) {
            sendMessage(res, 400, 'fail', 'Sorry, you already have a request with those details');
            return null;
          }
        }
        pool.query(requestDetails)
          .then(newRequest => sendSuccess(res, 201, 'A new request was just created', newRequest.rows[0]));
        return null;
      });
  }

  /**
 * @description Returns all the requests made by a user
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static retrieveRequests(req, res) {
    const { id } = req.user;

    const getUserRequests = `SELECT * FROM requests WHERE requests.user_id = '${id}'`;

    pool.query(getUserRequests)
      .then((userRequests) => {
        if (userRequests.rowCount === 0) {
          sendMessage(res, 200, 'success', 'Sorry,you have not made any requests');
          return null;
        }
        sendSuccess(res, 200, 'Your requests have been retrieved', userRequests.rows);
        return null;
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
    const { id } = req.user;
    const { request } = req.foundARequest;

    if (request.user_id !== id) {
      sendMessage(res, 400, 'fail', 'Sorry, you cannot view that request');
      return null;
    }
    sendSuccess(res, 200, 'Your request has been retrieved', request);
    return null;
  }

  /**
 * @description Modify a request
 *
 * @return {Object}
 *
 * @param {param} req
 * @param {param} res
 */
  static updateRequest(req, res) {
    const { id } = req.user;
    const updateValueArray = Object.keys(req.body);
    const { title, type, description } = req.body;
    const requestId = parseInt(req.params.requestId, 10);

    if (!Number.isInteger(requestId)) {
      sendMessage(res, 422, 'fail', 'Sorry, your requestId has to be a number');
      return null;
    }

    const emptyString = updateValueArray.find(updateValue => req.body[updateValue].trim() === '');

    if (emptyString) {
      sendMessage(res, 400, 'fail', 'Sorry, one or more of your update value is empty');
      return null;
    }

    const getUserRequests = `SELECT * FROM requests WHERE requests.user_id = '${id}'`;

    pool.query(getUserRequests)
      .then((userRequests) => {
        if (userRequests.rowCount === 0) {
          sendMessage(res, 200, 'success', 'Sorry,you have not made any requests');
          return null;
        }
        const request = userRequests.rows.find(singleRequest => (singleRequest.title === title &&
          singleRequest.description === description && singleRequest.type === type));
        if (request) {
          sendMessage(res, 400, 'fail', 'Sorry, you already have a request with those details');
          return null;
        }

        const requestToUpdate = `SELECT * FROM requests WHERE requests.id = '${requestId}' AND requests.user_id = '${id}'`;

        return pool.query(requestToUpdate)
          .then((requestFound) => {
            if (requestFound.rowCount === 0) {
              sendMessage(res, 404, 'fail', 'Sorry, you do not have a request with that id');
              return null;
            }
            if (requestFound.rows[0].status === 'approved') {
              sendMessage(res, 401, 'fail', 'Sorry you cannot update this request');
              return null;
            }
            const updatedRequest = { ...requestFound.rows[0], ...req.body };

            const updateTheRequest = `UPDATE requests SET title = '${updatedRequest.title}', type = '${updatedRequest.type}', description = '${updatedRequest.description}' WHERE requests.id = '${requestId}' RETURNING *`;
            pool.query(updateTheRequest)
              .then(updatedFoundRequest => sendSuccess(res, 200, 'Your request has been updated', updatedFoundRequest.rows[0]));
            return null;
          });
      });
    return null;
  }
}

export default Users;
