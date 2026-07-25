import { Router } from 'express';
import { TeamController } from '../controllers/team.controller.js';
import { authenticate } from '../../../middleware/authenticate.js';
import { authorize } from '../../../middleware/authorize.js';

const router = Router();
const controller = new TeamController();

router.use(authenticate);
router.use(authorize('EMPLOYER', 'ADMIN'));

router.get('/organizations', controller.getOrganizations);
router.post('/organizations', controller.createOrganization);

router.get('/departments', controller.getDepartments);
router.post('/departments', controller.createDepartment);

router.get('/members', controller.getTeamMembers);
router.patch('/members/:id', controller.updateTeamMember);

router.get('/invitations', controller.getInvitations);
router.post('/invite', controller.inviteTeamMember);

router.get('/audit-logs', controller.getAuditLogs);

export default router;
