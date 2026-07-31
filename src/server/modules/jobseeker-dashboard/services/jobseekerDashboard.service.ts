import { JobSeekerDashboardRepository } from '../repositories/jobseekerDashboard.repository.js';
import {
  JobSeekerDashboardPayload,
  DashboardSummaryMetrics,
  ProfileCompletionBreakdown,
  RecentActivityItem,
  JobSeekerDashboardPreferences,
} from '../types/jobseekerDashboard.types.js';
import { retryWithBackoff } from '../../../utils/resilience.js';
import { SavedJob } from '../../../database/models/SavedJob.js';
import { Job } from '../../../database/models/Job.js';

interface SavedJobPopulatedDoc {
  jobId?: Record<string, unknown>;
}

export class JobSeekerDashboardService {
  private repository: JobSeekerDashboardRepository;

  constructor() {
    this.repository = new JobSeekerDashboardRepository();
  }

  /**
   * Aggregate full dashboard payload with resilience retry wrappers.
   */
  async getDashboardPayload(userId: string): Promise<JobSeekerDashboardPayload> {
    return retryWithBackoff(async () => {
      const [summaryMetrics, profileCompletion, recentActivity, savedJobsPreview, recommendedJobsPreview] =
        await Promise.all([
          this.repository.getSummaryMetrics(userId),
          this.repository.getProfileCompletion(userId),
          this.repository.getRecentActivity(userId),
          SavedJob.find({ userId }).sort({ createdAt: -1 }).limit(3).populate('jobId').lean<SavedJobPopulatedDoc[]>(),
          Job.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3).lean<Record<string, unknown>[]>(),
        ]);

      summaryMetrics.profileCompletionPercentage = profileCompletion.score;

      const quickActions = this.repository.getQuickActions();

      const defaultPreferences: JobSeekerDashboardPreferences = {
        userId,
        layoutMode: 'COMFORTABLE',
        visibleWidgets: {
          summaryCards: true,
          profileCompletion: true,
          recentActivity: true,
          savedJobs: true,
          recommendedJobs: true,
          interviews: true,
          careerProgress: true,
        },
        emailAlertsEnabled: true,
        themePreference: 'SYSTEM',
      };

      return {
        summary: summaryMetrics,
        profileCompletion,
        recentActivity,
        quickActions,
        preferences: defaultPreferences,
        savedJobsPreview: savedJobsPreview.map((s) => s.jobId).filter((j): j is Record<string, unknown> => Boolean(j)),
        recommendedJobsPreview,
      };
    });
  }

  async getSummary(userId: string): Promise<DashboardSummaryMetrics> {
    const summary = await this.repository.getSummaryMetrics(userId);
    const profile = await this.repository.getProfileCompletion(userId);
    summary.profileCompletionPercentage = profile.score;
    return summary;
  }

  async getProfileCompletion(userId: string): Promise<ProfileCompletionBreakdown> {
    return this.repository.getProfileCompletion(userId);
  }

  async getActivity(userId: string): Promise<RecentActivityItem[]> {
    return this.repository.getRecentActivity(userId);
  }
}
