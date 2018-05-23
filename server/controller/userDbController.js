import { sign } from 'jsonwebtoken';
import { hashSync } from 'bcrypt-nodejs';
import pool from '../models/db';

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
}

export default Users;
