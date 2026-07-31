import { Router } from 'express';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';
import { ApplicationWorkspaceController } from '../controllers/applicationWorkspace.controller.js';

const router = Router();
const controller = new ApplicationWorkspaceController();

router.use(authenticate);
router.use(authorize('JOB_SEEKER'));

router.get('/', controller.getWorkspace);
router.post('/collections', controller.createCollection);
router.get('/career-preferences', controller.getCareerPreferences);
router.patch('/career-preferences', controller.updateCareerPreferences);
router.get('/career-goals', controller.getCareerGoals);
router.patch('/career-goals', controller.updateCareerGoals);

export default router;
