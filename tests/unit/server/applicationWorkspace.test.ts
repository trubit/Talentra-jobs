import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApplicationWorkspaceService } from '../../../src/server/modules/application-workspace/services/applicationWorkspace.service.js';
import { ApplicationWorkspaceRepository } from '../../../src/server/modules/application-workspace/repositories/applicationWorkspace.repository.js';

vi.mock('../../../src/server/modules/application-workspace/repositories/applicationWorkspace.repository.js');

describe('Application Workspace Suite', () => {
  let service: ApplicationWorkspaceService;
  let mockRepo: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo = {
      getApplications: vi.fn().mockResolvedValue([
        {
          id: 'app_1',
          jobId: 'job_1',
          jobTitle: 'Senior Full Stack Engineer',
          companyName: 'TechCorp',
          status: 'UNDER_REVIEW',
          appliedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isArchived: false,
        },
      ]),
      getCollections: vi.fn().mockResolvedValue([
        { id: 'col_remote', name: 'Remote Roles', jobCount: 4, createdAt: new Date().toISOString() },
      ]),
      getCareerPreferences: vi.fn().mockResolvedValue({
        userId: 'user_123',
        preferredTitles: ['Software Engineer'],
        preferredWorkMode: 'REMOTE',
      }),
      getCareerGoals: vi.fn().mockResolvedValue({
        userId: 'user_123',
        shortTermGoal: 'Build enterprise platforms',
      }),
      getRecentlyViewedJobs: vi.fn().mockResolvedValue([
        { id: 'view_1', title: 'Tech Lead', companyName: 'Fintech Inc', viewedAt: new Date().toISOString() },
      ]),
    };

    (ApplicationWorkspaceRepository as any).mockImplementation(() => mockRepo);
    service = new ApplicationWorkspaceService();
  });

  it('retrieves aggregate application workspace payload', async () => {
    const payload = await service.getWorkspacePayload('user_123');
    expect(payload.applications.length).toBe(1);
    expect(payload.collections.length).toBe(1);
    expect(payload.careerPreferences.preferredWorkMode).toBe('REMOTE');
  });

  it('retrieves career preferences', async () => {
    const pref = await service.getCareerPreferences('user_123');
    expect(pref.userId).toBe('user_123');
    expect(pref.preferredWorkMode).toBe('REMOTE');
  });

  it('retrieves career goals', async () => {
    const goals = await service.getCareerGoals('user_123');
    expect(goals.shortTermGoal).toBe('Build enterprise platforms');
  });
});
