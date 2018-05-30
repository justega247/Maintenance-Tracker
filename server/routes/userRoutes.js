import express from 'express';
import Users from '../controller/userDbController';
import Authenticate from '../middleware/authenticate';
import ValidateRequests from '../middleware/validateRequests';
import findARequestById from '../middleware/findRequestById';

const router = express.Router();

router.post('/requests', Authenticate.authenticateUser, ValidateRequests.requestDataValidation, Users.addRequest);
router.get('/requests', Authenticate.authenticateUser, Users.retrieveRequests);
router.get('/requests/:requestId', Authenticate.authenticateUser, findARequestById, Users.returnRequest);
router.put('/requests/:requestId', Authenticate.authenticateUser, ValidateRequests.requestUpdateValidation, Users.updateRequest);

export default router;
