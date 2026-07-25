import { Router } from 'express';
import { WorkspaceController } from '../controllers/workspace.controller.js';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';

const router = Router();
const controller = new WorkspaceController();

router.use(authenticate);
router.use(authorize('EMPLOYER', 'ADMIN'));

router.get('/tags', controller.getTags);
router.post('/tags', controller.createTag);

router.get('/tasks', controller.getTasks);
router.post('/tasks', controller.createTask);
router.patch('/tasks/:id', controller.updateTaskStatus);

router.get('/saved-searches', controller.getSavedSearches);
router.post('/saved-searches', controller.createSavedSearch);
router.delete('/saved-searches/:id', controller.deleteSavedSearch);

router.get('/notes/:applicationId', controller.getNotes);
router.post('/notes/:applicationId', controller.createNote);

router.post('/candidate-comparison', controller.compareCandidates);
router.post('/bulk-actions', controller.bulkActions);

export default router;
