import express from 'express';
import Requests from '../controller/requestDbController';
import Authenticate from '../middleware/authenticate';
import findARequestById from '../middleware/utils';

const router = express.Router();

router.use('*', Authenticate.authenticateAdminUser);

router.get('/', Requests.retrieveRequests);
router.put('/:requestId/approve', findARequestById, Requests.approveRequests);
router.put('/:requestId/disapprove', findARequestById, Requests.disapproveRequests);
router.put('/:requestId/resolve', findARequestById, Requests.resolveRequests);

export default router;
