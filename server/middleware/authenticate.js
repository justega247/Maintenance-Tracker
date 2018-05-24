import { compareSync } from 'bcrypt-nodejs';
import { verify } from 'jsonwebtoken';
import pool from '../models/database';

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
          return res.status(404).json({
            status: 'fail',
            message: 'No user found with that username.',
          });
        } else if (compareSync(password, usernameFound.rows[0].password)) {
          req.user = {
            id: usernameFound.rows[0].id,
            username: usernameFound.rows[0].username,
          };
          return next();
        }
        return res.status(400).json({
          status: 'fail',
          message: 'Sorry, your password does not match',
        });
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
            return res
              .status(401)
              .json({
                status: 'fail',
                message: 'Current session expired,please login to continue',
              });
          }
        }
        req.decoded = decoded;
        const userId = decoded.id;
        const findUserWithId = `SELECT * FROM users WHERE users.id = '${userId}'`;
        pool.query(findUserWithId)
          .then((foundUser) => {
            if (foundUser.rowCount === 0) {
              return res.status(404).json({
                status: 'fail',
                message: 'Sorry, no user with a matching id was found',
              });
            }
            req.user = {
              id: foundUser.rows[0].id,
            };
            return next();
          });
        return null;
      });
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Please, you have not added your token',
      });
    }
    return null;
  }
}

export default Authenticate;
