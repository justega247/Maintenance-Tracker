import express from 'express';
import Users from '../controller/userController';

const router = express.Router();

router.get('/requests', Users.retrieveRequests);
router.get('/requests/:requestId', Users.returnRequest);

export default router;
