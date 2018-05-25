import express from 'express';
import Requests from '../controller/requestDbController';
import Authenticate from '../middleware/authenticate';

const router = express.Router();

router.use('*', Authenticate.authenticateAdminUser);

router.get('/', Requests.retrieveRequests);

export default router;
