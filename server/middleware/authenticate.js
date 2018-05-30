import { compareSync } from 'bcrypt-nodejs';
import { verify } from 'jsonwebtoken';
import pool from '../models/database';
import { sendMessage } from '../utils/utils';

const { SECRET } = process.env;

/**
 * @class Authenticate
 */
class Authenticate {
  /**
 * @description it authenticates the validity of the credentials supplied on user login
 *
 * @return {void}
 *
 * @param {param} req
 * @param {param} res
 * @param {func} next
 */
  static findByCredentials(req, res, next) {
    const { username, password } = req.body;

    const findUserWithUsername = `SELECT * FROM users WHERE users.username = '${username}'`;

    pool.query(findUserWithUsername)
      .then((usernameFound) => {
        if (usernameFound.rowCount === 0) {
          return sendMessage(res, 404, 'fail', 'No user found with that username.');
        } else if (compareSync(password, usernameFound.rows[0].password)) {
          req.user = {
            id: usernameFound.rows[0].id,
            username: usernameFound.rows[0].username,
          };
          return next();
        }
        return sendMessage(res, 400, 'fail', 'Sorry, your password does not match');
      });
  }

  /**
 * @description it authenticates the validity of a user
 *
 * @return {void}
 *
 * @param {param} req
 * @param {param} res
 * @param {func} next
 */
  static authenticateUser(req, res, next) {
    const token = req.headers['x-auth'];

    if (token) {
      verify(token, SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return sendMessage(res, 401, 'fail', 'Current session expired,please login to continue');
          }
        }
        req.decoded = decoded;
        const userId = decoded.id;
        const findUserWithId = `SELECT * FROM users WHERE users.id = '${userId}'`;
        pool.query(findUserWithId)
          .then((foundUser) => {
            if (foundUser.rowCount === 0) {
              return sendMessage(res, 404, 'fail', 'Sorry, no user with a matching id was found');
            }
            req.user = {
              id: foundUser.rows[0].id,
            };
            return next();
          });
        return null;
      });
    } else {
      return sendMessage(res, 400, 'fail', 'Please, you have not added your token');
    }
    return null;
  }
  static authenticateAdminUser(req, res, next) {
    const token = req.headers['x-auth'];

    if (token) {
      verify(token, SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return sendMessage(res, 401, 'fail', 'Current session expired,please login to continue');
          }
        }
        req.decoded = decoded;
        const userId = decoded.id;
        const findUserWithId = `SELECT * FROM users WHERE users.id = '${userId}'`;
        pool.query(findUserWithId)
          .then((foundUser) => {
            if (foundUser.rowCount === 0) {
              return sendMessage(res, 404, 'fail', 'Sorry, no user with a matching id was found');
            }
            if (foundUser.rows[0].role !== 'admin') {
              return sendMessage(res, 403, 'fail', 'Sorry, you are not allowed to access this route');
            }
            req.user = {
              id: foundUser.rows[0].id,
            };
            return next();
          });
        return null;
      });
    } else {
      return sendMessage(res, 400, 'fail', 'Please, you have not added your token');
    }
    return null;
  }
}

export default Authenticate;
