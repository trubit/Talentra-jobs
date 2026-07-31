import { Router } from 'express';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';
import { JobSeekerDashboardController } from '../controllers/jobseekerDashboard.controller.js';

const router = Router();
const controller = new JobSeekerDashboardController();

// All job seeker dashboard routes require authentication and JOB_SEEKER role
router.use(authenticate);
router.use(authorize('JOB_SEEKER'));

router.get('/', controller.getDashboard);
router.get('/summary', controller.getSummary);
router.get('/profile-completion', controller.getProfileCompletion);
router.get('/activity', controller.getActivity);
router.patch('/preferences', controller.updatePreferences);

export default router;
