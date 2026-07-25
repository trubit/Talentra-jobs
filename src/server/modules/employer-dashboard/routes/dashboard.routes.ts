import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';

const router = Router();
const controller = new DashboardController();

router.use(authenticate);
router.use(authorize('EMPLOYER', 'ADMIN'));

router.get('/summary', controller.getSummary);
router.get('/activity', controller.getActivityFeed);
router.get('/recent-jobs', controller.getRecentJobs);
router.get('/recent-applications', controller.getRecentApplications);
router.get('/recent-interviews', controller.getRecentInterviews);
router.get('/search', controller.search);
router.get('/preferences', controller.getPreferences);
router.put('/preferences', controller.updatePreferences);

export default router;
