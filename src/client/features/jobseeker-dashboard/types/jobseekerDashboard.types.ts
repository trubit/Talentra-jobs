export interface DashboardSummaryMetrics {
  applicationsSubmitted: number;
  activeApplications: number;
  interviewsScheduled: number;
  savedJobs: number;
  profileCompletionPercentage: number;
  jobMatchesCount: number;
  pendingTasksCount: number;
  offersReceived: number;
}

export interface ProfileCompletionItem {
  key: string;
  label: string;
  completed: boolean;
  weight: number;
  actionUrl: string;
}

export interface ProfileCompletionBreakdown {
  score: number;
  items: ProfileCompletionItem[];
  missingCount: number;
  nextRecommendedAction?: ProfileCompletionItem;
}

export interface RecentActivityItem {
  id: string;
  type: 'APPLICATION_SUBMITTED' | 'JOB_SAVED' | 'RESUME_UPDATED' | 'PROFILE_UPDATED' | 'INTERVIEW_INVITATION' | 'STATUS_CHANGED';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  actionUrl: string;
  badge?: string;
  enabled: boolean;
}

export interface JobSeekerDashboardPreferences {
  layoutMode: 'COMPACT' | 'COMFORTABLE' | 'SPACIOUS';
  visibleWidgets: {
    summaryCards: boolean;
    profileCompletion: boolean;
    recentActivity: boolean;
    savedJobs: boolean;
    recommendedJobs: boolean;
    interviews: boolean;
    careerProgress: boolean;
  };
  emailAlertsEnabled: boolean;
  themePreference: 'LIGHT' | 'DARK' | 'SYSTEM';
}

export interface JobSeekerDashboardPayload {
  summary: DashboardSummaryMetrics;
  profileCompletion: ProfileCompletionBreakdown;
  recentActivity: RecentActivityItem[];
  quickActions: QuickActionItem[];
  preferences: JobSeekerDashboardPreferences;
  savedJobsPreview: Record<string, unknown>[];
  recommendedJobsPreview: Record<string, unknown>[];
}
