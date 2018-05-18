import express from 'express';

import Users from '../controller/userController';

const router = express.Router();

router.get('/requests', Users.retrieveRequests);

module.exports = router;
