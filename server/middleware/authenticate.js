import { compareSync } from 'bcrypt-nodejs';
import pool from '../models/db';

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
}

export default Authenticate;
