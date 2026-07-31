export interface CareerScoreBreakdown {
  overallScore: number;
  resumeScore: number;
  skillsScore: number;
  profileScore: number;
  experienceScore: number;
  portfolioScore: number;
  percentileRank: number;
}

export interface JobMatchBreakdown {
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  location?: string;
  salaryRange?: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvementAreas: string[];
}

export interface SkillsAnalysisResult {
  existingSkills: string[];
  missingSkills: string[];
  trendingSkills: string[];
  transferableSkills: string[];
  skillGapPercentage: number;
}

export interface CareerRoadmapStep {
  id: string;
  title: string;
  targetRole: string;
  timeframe: string;
  completed: boolean;
  requiredSkills: string[];
  targetCertifications: string[];
  recommendedProjects: string[];
}

export interface CareerRoadmapPlan {
  id: string;
  userId: string;
  currentRole: string;
  targetRole: string;
  milestones: CareerRoadmapStep[];
  updatedAt: string;
}

export interface ProfileOptimizationRecommendation {
  id: string;
  category: 'SKILLS' | 'SUMMARY' | 'EXPERIENCE' | 'CERTIFICATION' | 'PORTFOLIO' | 'VISIBILITY';
  title: string;
  description: string;
  impactScore: number; // 1-100
  actionUrl: string;
}

export interface ProfileOptimizationReport {
  completenessScore: number;
  recommendations: ProfileOptimizationRecommendation[];
}

export interface ProfileVisibilitySettings {
  userId: string;
  visibilityMode: 'PUBLIC' | 'RECRUITER_ONLY' | 'ANONYMOUS' | 'HIDDEN';
  allowRecruiterMessages: boolean;
  hideCurrentEmployer: boolean;
  anonymousAlias?: string;
}

export interface CareerIntelligencePayload {
  careerScore: CareerScoreBreakdown;
  topJobMatches: JobMatchBreakdown[];
  skillsAnalysis: SkillsAnalysisResult;
  activeRoadmap: CareerRoadmapPlan;
  optimizationReport: ProfileOptimizationReport;
  visibilitySettings: ProfileVisibilitySettings;
}

export interface AIProviderAdapter {
  providerName: string;
  analyzeSkills(skills: string[], targetRole: string): Promise<SkillsAnalysisResult>;
  calculateJobMatch(candidateProfile: Record<string, unknown>, jobDescription: Record<string, unknown>): Promise<JobMatchBreakdown>;
}
