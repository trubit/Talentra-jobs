import { Job } from '../../../database/models/Job.js';
import { JobApplication } from '../../../database/models/JobApplication.js';
import { Interview } from '../../../database/models/Interview.js';
import { JobOffer } from '../../../database/models/JobOffer.js';
import { WorkspaceAutomationRule, IWorkspaceAutomationRule } from '../../../database/models/WorkspaceAutomationRule.js';
import { EmployerAnalyticsResponseDto } from '../dto/analytics.dto.js';

export class AnalyticsRepository {
  async getMetrics(employerId: string): Promise<EmployerAnalyticsResponseDto> {
    const [
      totalJobs,
      activeJobs,
      closedJobs,
      totalApplications,
      shortlistedCount,
      interviewCount,
      offerCount,
      hiredCount,
    ] = await Promise.all([
      Job.countDocuments({ employer: employerId, isDeleted: false }),
      Job.countDocuments({ employer: employerId, status: 'PUBLISHED', isDeleted: false }),
      Job.countDocuments({ employer: employerId, status: 'CLOSED', isDeleted: false }),
      JobApplication.countDocuments({ employer: employerId, isDeleted: false }),
      JobApplication.countDocuments({ employer: employerId, status: 'SHORTLISTED', isDeleted: false }),
      Interview.countDocuments({ employer: employerId, isDeleted: false }),
      JobOffer.countDocuments({ employer: employerId, isDeleted: false }),
      JobApplication.countDocuments({ employer: employerId, status: 'HIRED', isDeleted: false }),
    ]);

    const conversionRate = totalApplications > 0 ? (hiredCount / totalApplications) * 100 : 0;

    return {
      totalJobs,
      activeJobs,
      closedJobs,
      totalApplications,
      shortlistedCount,
      interviewCount,
      offerCount,
      hiredCount,
      conversionRate: Math.round(conversionRate * 10) / 10,
      averageTimeToHireDays: 14,
    };
  }

  async getProductivity(employerId: string) {
    const [reviewedCount, tasksCompleted] = await Promise.all([
      JobApplication.countDocuments({ employer: employerId, status: { $ne: 'APPLIED' }, isDeleted: false }),
      JobApplication.countDocuments({ employer: employerId, status: 'HIRED', isDeleted: false }),
    ]);

    return {
      applicationsReviewed: reviewedCount,
      hiresCompleted: tasksCompleted,
      averageResponseTimeHours: 18,
    };
  }

  async createAutomationRule(data: Partial<IWorkspaceAutomationRule>): Promise<IWorkspaceAutomationRule> {
    const rule = new WorkspaceAutomationRule(data);
    return rule.save();
  }

  async getAutomationRules(employerId: string): Promise<IWorkspaceAutomationRule[]> {
    return WorkspaceAutomationRule.find({ employer: employerId }).sort({ createdAt: -1 });
  }

  async toggleAutomationRule(id: string, isEnabled: boolean): Promise<IWorkspaceAutomationRule | null> {
    return WorkspaceAutomationRule.findByIdAndUpdate(id, { isEnabled }, { new: true });
  }
}
