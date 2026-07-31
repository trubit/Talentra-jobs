import { Router } from 'express';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';
import { ResumeBuilderController } from '../controllers/resumeBuilder.controller.js';

const router = Router();
const controller = new ResumeBuilderController();

router.use(authenticate);
router.use(authorize('JOB_SEEKER'));

router.get('/', controller.getBuilderPayload);
router.post('/', controller.createResume);
router.patch('/:id', controller.updateResume);
router.post('/:id/share', controller.generateShareToken);
router.post('/cover-letters', controller.createCoverLetter);
router.post('/portfolio', controller.createPortfolioProject);

export default router;
