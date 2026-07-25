import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.js';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';

const router = Router();
const controller = new AnalyticsController();

router.use(authenticate);
router.use(authorize('EMPLOYER', 'ADMIN'));

router.get('/', controller.getMetrics);
router.get('/productivity', controller.getProductivity);

router.get('/automation', controller.getAutomationRules);
router.post('/automation', controller.createAutomationRule);
router.patch('/automation/:id', controller.toggleAutomationRule);

export default router;
