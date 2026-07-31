import { Types } from 'mongoose';
import { JobApplication } from '../../../database/models/JobApplication.js';
import { JobView } from '../../../database/models/JobView.js';
import { JobSeekerProfile } from '../../../database/models/JobSeekerProfile.js';
import {
  CareerPreferences,
  CareerGoals,
  SavedJobCollection,
} from '../types/applicationWorkspace.types.js';

interface PopulatedJob {
  _id?: Types.ObjectId;
  title?: string;
  companyName?: string;
  companyLogoUrl?: string;
}

interface ApplicationQueryResult {
  _id: Types.ObjectId;
  jobId?: PopulatedJob;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface JobViewQueryResult {
  _id: Types.ObjectId;
  jobId?: PopulatedJob;
  createdAt: Date | string;
}

export class ApplicationWorkspaceRepository {
  async getApplications(userId: string) {
    const userObjId = new Types.ObjectId(userId);
    const apps = await JobApplication.find({ applicantId: userObjId })
      .sort({ updatedAt: -1 })
      .populate('jobId', 'title companyName companyLogoUrl')
      .lean<ApplicationQueryResult[]>();

    return apps.map((app) => ({
      id: app._id.toString(),
      jobId: app.jobId?._id?.toString() || '',
      jobTitle: app.jobId?.title || 'Position',
      companyName: app.jobId?.companyName || 'Company',
      companyLogoUrl: app.jobId?.companyLogoUrl,
      status: app.status,
      appliedAt: new Date(app.createdAt).toISOString(),
      updatedAt: new Date(app.updatedAt).toISOString(),
      isArchived: app.status === 'ARCHIVED' || app.status === 'REJECTED' || app.status === 'WITHDRAWN',
    }));
  }

  async getCollections(_userId: string): Promise<SavedJobCollection[]> {
    return [
      { id: 'col_remote', name: 'Remote Roles', description: 'Saved work-from-anywhere opportunities', jobCount: 4, color: '#3B82F6', createdAt: new Date().toISOString() },
      { id: 'col_tech', name: 'Engineering', description: 'Full stack & DevOps roles', jobCount: 6, color: '#10B981', createdAt: new Date().toISOString() },
      { id: 'col_urgent', name: 'Priority Apply', description: 'Urgent hiring positions', jobCount: 2, color: '#EF4444', createdAt: new Date().toISOString() },
    ];
  }

  async getCareerPreferences(userId: string): Promise<CareerPreferences> {
    const profile = await JobSeekerProfile.findOne({ user: userId }).lean<Record<string, unknown>>();

    return {
      userId,
      preferredTitles: [((profile?.currentPosition as string) || 'Software Engineer')],
      preferredIndustries: [((profile?.industry as string) || 'Technology')],
      preferredSkills: (profile?.skills as string[]) || ['React', 'TypeScript', 'Node.js'],
      preferredEmploymentType: (profile?.preferredJobType as CareerPreferences['preferredEmploymentType']) || 'FULL_TIME',
      preferredWorkMode: (profile?.preferredWorkMode as CareerPreferences['preferredWorkMode']) || 'REMOTE',
      preferredSalaryRange: { min: 90000, max: 140000, currency: 'USD' },
      preferredLocations: [profile?.location ? (profile.location as { city?: string }).city || 'New York' : 'Remote'],
      openToRelocation: true,
      requiresVisaSponsorship: false,
    };
  }

  async getCareerGoals(userId: string): Promise<CareerGoals> {
    return {
      userId,
      shortTermGoal: 'Secure a Senior Full Stack Engineer role at a top-tier tech platform.',
      longTermGoal: 'Transition into a Staff Engineer / Tech Lead position within 3 years.',
      desiredRole: 'Senior Full Stack Engineer',
      targetIndustries: ['Technology', 'Fintech', 'AI / Cloud Services'],
      skillsToAcquire: ['System Design', 'Kubernetes', 'GraphQL'],
      targetCertifications: ['AWS Certified Solutions Architect', 'CKAD'],
    };
  }

  async getRecentlyViewedJobs(userId: string) {
    const userObjId = new Types.ObjectId(userId);
    const views = await JobView.find({ userId: userObjId })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('jobId', 'title companyName')
      .lean<JobViewQueryResult[]>();

    return views.map((v) => ({
      id: v._id ? v._id.toString() : '',
      title: v.jobId?.title || 'Job Opening',
      companyName: v.jobId?.companyName || 'Company',
      viewedAt: new Date(v.createdAt || Date.now()).toISOString(),
    }));
  }
}
