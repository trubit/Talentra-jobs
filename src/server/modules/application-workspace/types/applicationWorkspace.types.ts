export interface SavedJobCollection {
  id: string;
  name: string;
  description?: string;
  jobCount: number;
  color?: string;
  createdAt: string;
}

export interface CareerPreferences {
  userId: string;
  preferredTitles: string[];
  preferredIndustries: string[];
  preferredSkills: string[];
  preferredEmploymentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'ANY';
  preferredWorkMode: 'REMOTE' | 'HYBRID' | 'ON_SITE' | 'ANY';
  preferredSalaryRange: {
    min?: number;
    max?: number;
    currency: string;
  };
  preferredLocations: string[];
  openToRelocation: boolean;
  requiresVisaSponsorship: boolean;
}

export interface CareerGoals {
  userId: string;
  shortTermGoal: string;
  longTermGoal: string;
  desiredRole: string;
  targetIndustries: string[];
  skillsToAcquire: string[];
  targetCertifications: string[];
}

export interface ApplicationWorkspacePayload {
  applications: Array<{
    id: string;
    jobId: string;
    jobTitle: string;
    companyName: string;
    companyLogoUrl?: string;
    status: string;
    appliedAt: string;
    updatedAt: string;
    isArchived: boolean;
  }>;
  collections: SavedJobCollection[];
  careerPreferences: CareerPreferences;
  careerGoals: CareerGoals;
  recentlyViewedJobs: Array<{
    id: string;
    title: string;
    companyName: string;
    viewedAt: string;
  }>;
}
