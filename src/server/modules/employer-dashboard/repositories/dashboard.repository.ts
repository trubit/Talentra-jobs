import { Job } from '../../../database/models/Job.js';
import { JobApplication } from '../../../database/models/JobApplication.js';
import { Interview } from '../../../database/models/Interview.js';
import { JobOffer } from '../../../database/models/JobOffer.js';
import { EmployerActivity, IEmployerActivity } from '../../../database/models/EmployerActivity.js';
import { EmployerDashboardPreference, IEmployerDashboardPreference } from '../../../database/models/EmployerDashboardPreference.js';
import { DashboardSummaryDto } from '../dto/dashboard.dto.js';

export class DashboardRepository {
  async getSummary(employerId: string): Promise<DashboardSummaryDto> {
    const [
      activeJobs,
      draftJobs,
      applicationsReceived,
      shortlistedCandidates,
      interviewsScheduled,
      offersSent,
      hiredCandidates,
    ] = await Promise.all([
      Job.countDocuments({ employer: employerId, status: 'PUBLISHED', isDeleted: false }),
      Job.countDocuments({ employer: employerId, status: 'DRAFT', isDeleted: false }),
      JobApplication.countDocuments({ employer: employerId, isDeleted: false }),
      JobApplication.countDocuments({ employer: employerId, status: 'SHORTLISTED', isDeleted: false }),
      Interview.countDocuments({ employer: employerId, status: 'SCHEDULED', isDeleted: false }),
      JobOffer.countDocuments({ employer: employerId, status: 'SENT', isDeleted: false }),
      JobApplication.countDocuments({ employer: employerId, status: 'HIRED', isDeleted: false }),
    ]);

    return {
      activeJobs,
      draftJobs,
      openPositions: activeJobs + draftJobs,
      applicationsReceived,
      shortlistedCandidates,
      interviewsScheduled,
      offersSent,
      hiredCandidates,
    };
  }

  async getActivityFeed(employerId: string, limit = 15): Promise<IEmployerActivity[]> {
    return EmployerActivity.find({ employer: employerId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async getRecentJobs(employerId: string, limit = 5) {
    return Job.find({ employer: employerId, isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async getRecentApplications(employerId: string, limit = 5) {
    return JobApplication.find({ employer: employerId, isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('applicant', 'firstName lastName email avatarUrl')
      .populate('job', 'title city country');
  }

  async getRecentInterviews(employerId: string, limit = 5) {
    return Interview.find({ employer: employerId, isDeleted: false })
      .sort({ scheduledAt: -1 })
      .limit(limit)
      .populate('candidate', 'firstName lastName email avatarUrl')
      .populate('job', 'title');
  }

  async getPreferences(userId: string): Promise<IEmployerDashboardPreference | null> {
    return EmployerDashboardPreference.findOne({ user: userId }).populate('selectedCompany');
  }

  async updatePreferences(
    userId: string,
    data: Partial<IEmployerDashboardPreference>
  ): Promise<IEmployerDashboardPreference> {
    return EmployerDashboardPreference.findOneAndUpdate(
      { user: userId },
      { $set: data },
      { new: true, upsert: true }
    );
  }
}
