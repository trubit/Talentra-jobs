import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkspaceService } from '../../../src/server/modules/recruitment-workspace/services/workspace.service';
import { JobApplication } from '../../../src/server/database/models/JobApplication';

vi.mock('../../../src/server/database/models/CandidateTag');
vi.mock('../../../src/server/database/models/RecruiterTask');
vi.mock('../../../src/server/database/models/CandidateNote');
vi.mock('../../../src/server/database/models/SavedSearch');
vi.mock('../../../src/server/database/models/JobApplication');

describe('Recruitment Workspace Suite', () => {
  let service: WorkspaceService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new WorkspaceService();
  });

  describe('compareCandidates', () => {
    it('throws bad request error if fewer than 2 candidate IDs are provided', async () => {
      await expect(service.compareCandidates(['app1'])).rejects.toThrow('Select at least 2 candidates');
    });
  });

  describe('bulkActions', () => {
    it('executes bulk status updates across selected applications', async () => {
      vi.mocked(JobApplication.updateMany).mockResolvedValueOnce({ acknowledged: true, matchedCount: 2, modifiedCount: 2, upsertedCount: 0, upsertedId: null } as never);

      const app1 = '64b8f0000000000000000001';
      const app2 = '64b8f0000000000000000002';
      const actorId = '64b8f0000000000000000009';

      const res = await service.bulkActions(actorId, {
        applicationIds: [app1, app2],
        action: 'SHORTLIST',
      });

      expect(res.updatedCount).toBe(2);
      expect(res.action).toBe('SHORTLIST');
      expect(JobApplication.updateMany).toHaveBeenCalledWith({ _id: { $in: [app1, app2] } }, { $set: { status: 'SHORTLISTED' } });
    });
  });
});
