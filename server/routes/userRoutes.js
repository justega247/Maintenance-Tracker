import express from 'express';
import Users from '../controller/userController';
import ValidateRequests from '../middleware/validateRequests';

const router = express.Router();

router.get('/requests', Users.retrieveRequests);
router.get('/requests/:requestId', Users.returnRequest);
router
  .post('/requests', ValidateRequests.requestDataValidation, Users.addRequest);

export default router;
