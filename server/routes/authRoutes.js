import express from 'express';
import Users from '../controller/userDbController';
import ValidateUser from '../middleware/validateUser';
import Authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/signup', ValidateUser.signUpDataValidation, Users.addUser);
router.post('/login', ValidateUser.signInDataValidation, Authenticate.findByCredentials, Users.signinUser);

export default router;
