import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DashboardService } from '../../../src/server/modules/employer-dashboard/services/dashboard.service';
import { Job } from '../../../src/server/database/models/Job';
import { JobApplication } from '../../../src/server/database/models/JobApplication';
import { Interview } from '../../../src/server/database/models/Interview';
import { JobOffer } from '../../../src/server/database/models/JobOffer';

vi.mock('../../../src/server/database/models/Job');
vi.mock('../../../src/server/database/models/JobApplication');
vi.mock('../../../src/server/database/models/Interview');
vi.mock('../../../src/server/database/models/JobOffer');
vi.mock('../../../src/server/database/models/EmployerActivity');
vi.mock('../../../src/server/database/models/EmployerDashboardPreference');

describe('Employer Dashboard Suite', () => {
  let service: DashboardService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new DashboardService();
  });

  describe('getSummary', () => {
    it('returns aggregated summary counts for active jobs, applications, interviews, and offers', async () => {
      vi.mocked(Job.countDocuments).mockResolvedValueOnce(5).mockResolvedValueOnce(2);
      vi.mocked(JobApplication.countDocuments).mockResolvedValueOnce(20).mockResolvedValueOnce(8).mockResolvedValueOnce(3);
      vi.mocked(Interview.countDocuments).mockResolvedValueOnce(4);
      vi.mocked(JobOffer.countDocuments).mockResolvedValueOnce(2);

      const summary = await service.getSummary('employer123');

      expect(summary.activeJobs).toBe(5);
      expect(summary.draftJobs).toBe(2);
      expect(summary.openPositions).toBe(7);
      expect(summary.applicationsReceived).toBe(20);
      expect(summary.shortlistedCandidates).toBe(8);
      expect(summary.interviewsScheduled).toBe(4);
      expect(summary.offersSent).toBe(2);
      expect(summary.hiredCandidates).toBe(3);
    });
  });
});
