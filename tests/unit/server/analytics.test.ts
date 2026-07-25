import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnalyticsService } from '../../../src/server/modules/analytics/services/analytics.service';
import { Job } from '../../../src/server/database/models/Job';
import { JobApplication } from '../../../src/server/database/models/JobApplication';
import { Interview } from '../../../src/server/database/models/Interview';
import { JobOffer } from '../../../src/server/database/models/JobOffer';

vi.mock('../../../src/server/database/models/Job');
vi.mock('../../../src/server/database/models/JobApplication');
vi.mock('../../../src/server/database/models/Interview');
vi.mock('../../../src/server/database/models/JobOffer');
vi.mock('../../../src/server/database/models/WorkspaceAutomationRule');

describe('Employer Analytics Suite', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AnalyticsService();
  });

  describe('getMetrics', () => {
    it('calculates pipeline funnel metrics and conversion rates correctly', async () => {
      vi.mocked(Job.countDocuments).mockResolvedValueOnce(10).mockResolvedValueOnce(7).mockResolvedValueOnce(3);
      vi.mocked(JobApplication.countDocuments).mockResolvedValueOnce(50).mockResolvedValueOnce(15).mockResolvedValueOnce(5);
      vi.mocked(Interview.countDocuments).mockResolvedValueOnce(10);
      vi.mocked(JobOffer.countDocuments).mockResolvedValueOnce(6);

      const metrics = await service.getMetrics('employer123');

      expect(metrics.totalJobs).toBe(10);
      expect(metrics.activeJobs).toBe(7);
      expect(metrics.totalApplications).toBe(50);
      expect(metrics.hiredCount).toBe(5);
      expect(metrics.conversionRate).toBe(10); // (5 / 50) * 100
    });
  });
});
