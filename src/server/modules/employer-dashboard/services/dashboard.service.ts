import { DashboardRepository } from '../repositories/dashboard.repository.js';
import { DashboardSummaryDto, UpdatePreferencesDto } from '../dto/dashboard.dto.js';
import { Job } from '../../../database/models/Job.js';
import { JobApplication } from '../../../database/models/JobApplication.js';

export class DashboardService {
  private repo = new DashboardRepository();

  async getSummary(employerId: string): Promise<DashboardSummaryDto> {
    return this.repo.getSummary(employerId);
  }

  async getActivityFeed(employerId: string) {
    return this.repo.getActivityFeed(employerId);
  }

  async getRecentJobs(employerId: string) {
    return this.repo.getRecentJobs(employerId);
  }

  async getRecentApplications(employerId: string) {
    return this.repo.getRecentApplications(employerId);
  }

  async getRecentInterviews(employerId: string) {
    return this.repo.getRecentInterviews(employerId);
  }

  async search(employerId: string, query: string) {
    if (!query || query.trim().length === 0) {
      return { jobs: [], applications: [] };
    }

    const regex = new RegExp(query.trim(), 'i');

    const [jobs, applications] = await Promise.all([
      Job.find({
        employer: employerId,
        isDeleted: false,
        $or: [{ title: regex }, { description: regex }, { city: regex }],
      }).limit(5),

      JobApplication.find({
        employer: employerId,
        isDeleted: false,
      })
        .limit(10)
        .populate('applicant', 'firstName lastName email avatarUrl')
        .populate('job', 'title'),
    ]);

    // Filter populated applications by applicant name/email or job title
    const filteredApps = applications.filter((app) => {
      const applicant = app.applicant as unknown as { firstName?: string; lastName?: string; email?: string };
      const job = app.job as unknown as { title?: string };
      const nameMatch = `${applicant?.firstName} ${applicant?.lastName}`.match(regex);
      const emailMatch = applicant?.email?.match(regex);
      const jobMatch = job?.title?.match(regex);
      return nameMatch || emailMatch || jobMatch;
    });

    return { jobs, applications: filteredApps };
  }

  async getPreferences(userId: string) {
    let prefs = await this.repo.getPreferences(userId);
    if (!prefs) {
      prefs = await this.repo.updatePreferences(userId, {
        sidebarCollapsed: false,
        visibleWidgets: ['summary', 'quick_actions', 'activity', 'recent_jobs', 'recent_applications'],
        widgetOrder: ['summary', 'quick_actions', 'activity', 'recent_jobs', 'recent_applications'],
        compactMode: false,
      });
    }
    return prefs;
  }

  async updatePreferences(userId: string, dto: UpdatePreferencesDto) {
    return this.repo.updatePreferences(userId, dto);
  }
}
