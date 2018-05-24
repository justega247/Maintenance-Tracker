import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { hashSync } from 'bcrypt-nodejs';
import pool from '../models/database';

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
    const {
      username, fullname, email, password,
    } = req.body;

    const hashedPassword = hashSync(password);

    const newUser = `INSERT INTO users (username,fullname,email,password)VALUES ('${username}','${fullname}','${email}','${hashedPassword}') RETURNING id, username, fullname;`;
    const checkDetails = `SELECT username, email FROM users WHERE users.username = '${username}' OR users.email = '${email}'`;

    pool.query(checkDetails)
      .then((detailsFound) => {
        if (detailsFound.rowCount !== 0) {
          return res.status(409).json({
            status: 'fail',
            message: 'Sorry, the username or email you supplied, already exists',
          });
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
            res.header('x-auth', token).status(201).json({
              status: 'success',
              message: 'A new user has just been created',
              yourDetails: {
                id: createdUser.rows[0].id,
                name: createdUser.rows[0].fullname,
                username: createdUser.rows[0].username,
              },
            });
          })
          .catch(() => res.status(400).json({
            status: 'fail',
            message: 'Sorry, your request could not be processed',
          }));
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
    res.header('x-auth', token).status(200).json({
      status: 'success',
      message: 'You signed in successfully',
      details: {
        id,
        username,
      },
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
    const { id } = req.user;

    const requestDetails = `INSERT INTO requests (user_id,title,type,description) VALUES('${id}','${title}','${type}','${description}') RETURNING id, title, type, description, user_id;`;

    pool.query(requestDetails)
      .then(newRequest => res.status(201).json({
        status: 'success',
        message: 'A new request was just created',
        request: newRequest.rows[0],
      }))
      .catch(() => res.status(400).json({
        status: 'fail',
        message: 'Please check the details you have entered',
      }));
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
          return res.status(200).json({
            status: 'success',
            message: 'Sorry,you have not made any requests',
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Your requests have been retrieved',
          requests: userRequests.rows,
        });
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
    const requestId = parseInt(req.params.requestId, 10);

    const findARequest = `SELECT * FROM requests WHERE requests.id = '${requestId}'`;

    pool.query(findARequest)
      .then((requestFound) => {
        if (requestFound.rowCount === 0) {
          return res.status(404).json({
            status: 'fail',
            message: 'Sorry, there is no request with that id',
          });
        }
        if (requestFound.rows[0].user_id !== id) {
          return res.status(400).json({
            status: 'fail',
            message: 'Sorry, you cannot view that request',
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Your request has been retrieved',
          request: requestFound.rows[0],
        });
      });
  }
}

export default Users;
