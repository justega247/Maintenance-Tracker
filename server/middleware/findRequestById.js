import pool from '../models/database';

const findARequestById = (req, res, next) => {
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
      req.foundARequest = {
        request: requestFound.rows[0],
      };
      return next();
    });
};

export default findARequestById;
