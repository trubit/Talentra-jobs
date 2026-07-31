import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JobSeekerDashboardService } from '../../../src/server/modules/jobseeker-dashboard/services/jobseekerDashboard.service';
import { JobSeekerDashboardRepository } from '../../../src/server/modules/jobseeker-dashboard/repositories/jobseekerDashboard.repository';

vi.mock('../../../src/server/modules/jobseeker-dashboard/repositories/jobseekerDashboard.repository');

describe('Job Seeker Dashboard Suite', () => {
  let service: JobSeekerDashboardService;
  let mockRepo: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo = {
      getSummaryMetrics: vi.fn().mockResolvedValue({
        applicationsSubmitted: 5,
        activeApplications: 2,
        interviewsScheduled: 1,
        savedJobs: 3,
        profileCompletionPercentage: 80,
        jobMatchesCount: 10,
        pendingTasksCount: 1,
        offersReceived: 0,
      }),
      getProfileCompletion: vi.fn().mockResolvedValue({
        score: 85,
        items: [
          { key: 'basicInfo', label: 'Basic Info', completed: true, weight: 50, actionUrl: '/profile' },
          { key: 'resume', label: 'Resume', completed: true, weight: 35, actionUrl: '/profile' },
        ],
        missingCount: 0,
      }),
      getRecentActivity: vi.fn().mockResolvedValue([
        {
          id: '1',
          type: 'APPLICATION_SUBMITTED',
          title: 'Applied for Engineer',
          description: 'Applied at TechCorp',
          timestamp: new Date().toISOString(),
        },
      ]),
      getQuickActions: vi.fn().mockReturnValue([
        { id: '1', title: 'Search Jobs', description: 'Explore', icon: 'Search', actionUrl: '/jobs', enabled: true },
      ]),
    };

    (JobSeekerDashboardRepository as any).mockImplementation(() => mockRepo);
    service = new JobSeekerDashboardService();
  });

  it('aggregates summary metrics correctly with profile completion score', async () => {
    const summary = await service.getSummary('user_123');
    expect(summary.applicationsSubmitted).toBe(5);
    expect(summary.profileCompletionPercentage).toBe(85);
  });

  it('returns profile completion breakdown', async () => {
    const completion = await service.getProfileCompletion('user_123');
    expect(completion.score).toBe(85);
    expect(completion.items.length).toBe(2);
  });

  it('retrieves recent activity feed', async () => {
    const activity = await service.getActivity('user_123');
    expect(activity.length).toBe(1);
    expect(activity[0].type).toBe('APPLICATION_SUBMITTED');
  });
});
