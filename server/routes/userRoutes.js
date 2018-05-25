import express from 'express';
import Users from '../controller/userDbController';
import ValidateUser from '../middleware/validateUser';
import Authenticate from '../middleware/authenticate';
import ValidateRequests from '../middleware/validateRequests';

const router = express.Router();

router.post('/auth/signup', ValidateUser.signUpDataValidation, Users.addUser);
router.post('/auth/login', ValidateUser.signInDataValidation, Authenticate.findByCredentials, Users.signinUser);
router.post('/requests', Authenticate.authenticateUser, ValidateRequests.requestDataValidation, Users.addRequest);
router.get('/requests', Authenticate.authenticateUser, Users.retrieveRequests);
router.get('/requests/:requestId', Authenticate.authenticateUser, Users.returnRequest);
router.put('/requests/:requestId', Authenticate.authenticateUser, ValidateRequests.requestUpdateValidation, Users.updateRequest);

export default router;
