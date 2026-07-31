import { Types } from 'mongoose';
import { JobSeekerProfile } from '../../../database/models/JobSeekerProfile.js';
import { JobApplication } from '../../../database/models/JobApplication.js';
import { SavedJob } from '../../../database/models/SavedJob.js';
import { Interview } from '../../../database/models/Interview.js';
import {
  DashboardSummaryMetrics,
  ProfileCompletionBreakdown,
  ProfileCompletionItem,
  RecentActivityItem,
  QuickActionItem,
} from '../types/jobseekerDashboard.types.js';

interface PopulatedJobDoc {
  _id?: Types.ObjectId;
  title?: string;
  companyName?: string;
}

interface ApplicationDoc {
  _id: Types.ObjectId;
  jobId?: PopulatedJobDoc;
  createdAt: Date | string;
}

interface SavedJobDoc {
  _id: Types.ObjectId;
  jobId?: PopulatedJobDoc;
  createdAt: Date | string;
}

export class JobSeekerDashboardRepository {
  /**
   * Aggregate metrics for job seeker summary cards.
   */
  async getSummaryMetrics(userId: string): Promise<DashboardSummaryMetrics> {
    const userObjId = new Types.ObjectId(userId);

    const [
      applicationsCount,
      activeAppsCount,
      interviewsCount,
      savedJobsCount,
      offersCount,
    ] = await Promise.all([
      JobApplication.countDocuments({ applicantId: userObjId }),
      JobApplication.countDocuments({
        applicantId: userObjId,
        status: { $in: ['SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED'] },
      }),
      Interview.countDocuments({ candidateId: userObjId, status: 'SCHEDULED' }),
      SavedJob.countDocuments({ userId: userObjId }),
      JobApplication.countDocuments({ applicantId: userObjId, status: 'OFFER_EXTENDED' }),
    ]);

    return {
      applicationsSubmitted: applicationsCount,
      activeApplications: activeAppsCount,
      interviewsScheduled: interviewsCount,
      savedJobs: savedJobsCount,
      profileCompletionPercentage: 0,
      jobMatchesCount: 12,
      pendingTasksCount: activeAppsCount > 0 ? 1 : 0,
      offersReceived: offersCount,
    };
  }

  /**
   * Calculate detailed profile completion breakdown.
   */
  async getProfileCompletion(userId: string): Promise<ProfileCompletionBreakdown> {
    const profile = await JobSeekerProfile.findOne({ user: userId }).lean<Record<string, unknown>>();

    const headline = profile?.headline as string | undefined;
    const about = profile?.about as string | undefined;
    const phoneNumber = profile?.phoneNumber as string | undefined;
    const location = profile?.location as { city?: string } | undefined;
    const avatarUrl = profile?.avatarUrl as string | undefined;
    const resumeUrl = profile?.resumeUrl as string | undefined;
    const education = profile?.education as unknown[];
    const experience = profile?.experience as unknown[];
    const skills = profile?.skills as unknown[];
    const certifications = profile?.certifications as unknown[];
    const socialLinks = profile?.socialLinks as { linkedin?: string; portfolio?: string } | undefined;

    const items: ProfileCompletionItem[] = [
      {
        key: 'basicInfo',
        label: 'Basic Profile & Headline',
        completed: Boolean(headline && about),
        weight: 15,
        actionUrl: '/profile/me',
      },
      {
        key: 'contactInfo',
        label: 'Phone & Location Details',
        completed: Boolean(phoneNumber && location?.city),
        weight: 10,
        actionUrl: '/profile/me',
      },
      {
        key: 'profilePhoto',
        label: 'Professional Profile Photo',
        completed: Boolean(avatarUrl),
        weight: 10,
        actionUrl: '/profile/me',
      },
      {
        key: 'resumeUploaded',
        label: 'Primary Resume File',
        completed: Boolean(resumeUrl),
        weight: 20,
        actionUrl: '/profile/me',
      },
      {
        key: 'education',
        label: 'Education History',
        completed: Boolean(education && Array.isArray(education) && education.length > 0),
        weight: 10,
        actionUrl: '/profile/me',
      },
      {
        key: 'experience',
        label: 'Work Experience',
        completed: Boolean(experience && Array.isArray(experience) && experience.length > 0),
        weight: 15,
        actionUrl: '/profile/me',
      },
      {
        key: 'skills',
        label: 'Key Skills & Competencies',
        completed: Boolean(skills && Array.isArray(skills) && skills.length >= 3),
        weight: 10,
        actionUrl: '/profile/me',
      },
      {
        key: 'certifications',
        label: 'Certifications',
        completed: Boolean(certifications && Array.isArray(certifications) && certifications.length > 0),
        weight: 5,
        actionUrl: '/profile/me',
      },
      {
        key: 'socialLinks',
        label: 'LinkedIn or Portfolio Links',
        completed: Boolean(socialLinks?.linkedin || socialLinks?.portfolio),
        weight: 5,
        actionUrl: '/profile/me',
      },
    ];

    const score = items.reduce((acc, item) => (item.completed ? acc + item.weight : acc), 0);
    const missingItems = items.filter((item) => !item.completed);

    return {
      score,
      items,
      missingCount: missingItems.length,
      nextRecommendedAction: missingItems[0],
    };
  }

  /**
   * Fetch recent activity feed for job seeker.
   */
  async getRecentActivity(userId: string, limit = 8): Promise<RecentActivityItem[]> {
    const userObjId = new Types.ObjectId(userId);

    const [recentApps, recentSaved] = await Promise.all([
      JobApplication.find({ applicantId: userObjId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('jobId', 'title companyName')
        .lean<ApplicationDoc[]>(),
      SavedJob.find({ userId: userObjId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('jobId', 'title companyName')
        .lean<SavedJobDoc[]>(),
    ]);

    const activities: RecentActivityItem[] = [];

    recentApps.forEach((app) => {
      activities.push({
        id: app._id.toString(),
        type: 'APPLICATION_SUBMITTED',
        title: 'Application Submitted',
        description: `Applied for ${app.jobId?.title || 'Position'} at ${app.jobId?.companyName || 'Company'}`,
        timestamp: new Date(app.createdAt).toISOString(),
      });
    });

    recentSaved.forEach((saved) => {
      activities.push({
        id: saved._id.toString(),
        type: 'JOB_SAVED',
        title: 'Job Saved',
        description: `Saved ${saved.jobId?.title || 'Position'} to bookmarks`,
        timestamp: new Date(saved.createdAt).toISOString(),
      });
    });

    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  }

  /**
   * Fetch quick action toolbar items.
   */
  getQuickActions(): QuickActionItem[] {
    return [
      {
        id: 'search_jobs',
        title: 'Search Opportunities',
        description: 'Explore matching openings',
        icon: 'Search',
        actionUrl: '/jobs',
        enabled: true,
      },
      {
        id: 'complete_profile',
        title: 'Update Profile',
        description: 'Keep resume and skills current',
        icon: 'Person',
        actionUrl: '/profile/me',
        enabled: true,
      },
      {
        id: 'manage_applications',
        title: 'Track Applications',
        description: 'View active application status',
        icon: 'Assignment',
        badge: 'Live',
        actionUrl: '/applications/me',
        enabled: true,
      },
      {
        id: 'view_saved',
        title: 'Saved Bookmarks',
        description: 'Access saved vacancies',
        icon: 'Bookmark',
        actionUrl: '/bookmarks',
        enabled: true,
      },
    ];
  }
}
