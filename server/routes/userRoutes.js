import express from 'express';
import Users from '../controller/userDbController';
import ValidateUser from '../middleware/validateUser';
// import ValidateRequests from '../middleware/validateRequests';

const router = express.Router();

router.post('/auth/signup', ValidateUser.signUpDataValidation, Users.addUser);
// router.get('/requests', Users.retrieveRequests);
// router.get('/requests/:requestId', Users.returnRequest);
// router
//   .post('/requests', ValidateRequests.requestDataValidation, Users.addRequest);
// router
//   .post('/requests/:requestId', ValidateRequests.requestUpdateValidation, Users.updateRequest);

export default router;
