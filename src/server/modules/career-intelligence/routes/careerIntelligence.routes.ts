import { Router } from 'express';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';
import { CareerIntelligenceController } from '../controllers/careerIntelligence.controller.js';

const router = Router();
const controller = new CareerIntelligenceController();

router.use(authenticate);
router.use(authorize('JOB_SEEKER'));

router.get('/', controller.getIntelligencePayload);
router.get('/job-matching', controller.getJobMatching);
router.get('/career-score', controller.getCareerScore);
router.get('/skills-analysis', controller.getSkillsAnalysis);
router.get('/career-roadmap', controller.getCareerRoadmap);
router.post('/career-roadmap', controller.createCareerRoadmap);
router.patch('/career-roadmap/:id', controller.updateRoadmapStep);
router.get('/profile-optimization', controller.getProfileOptimization);
router.get('/profile-visibility', controller.getProfileVisibility);
router.patch('/profile-visibility', controller.updateProfileVisibility);

export default router;
