import { Router } from 'express';
import { JobBookmarkController } from '../controllers/job-bookmark.controller.js';
import { authenticate } from '../../../middleware/authenticate.js';

const router = Router();
const controller = new JobBookmarkController();

router.get('/bookmarks', authenticate, controller.getBookmarks);
router.post('/jobs/:id/bookmark', authenticate, controller.bookmarkJob);
router.delete('/jobs/:id/bookmark', authenticate, controller.unbookmarkJob);

export default router;
