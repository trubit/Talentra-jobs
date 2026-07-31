import { Types } from 'mongoose';
import { JobSeekerProfile } from '../../../database/models/JobSeekerProfile.js';
import { Job } from '../../../database/models/Job.js';
import { Resume } from '../../../database/models/Resume.js';
import { Portfolio } from '../../../database/models/Portfolio.js';
import {
  CareerScoreBreakdown,
  JobMatchBreakdown,
  SkillsAnalysisResult,
  CareerRoadmapPlan,
  ProfileOptimizationReport,
  ProfileOptimizationRecommendation,
  ProfileVisibilitySettings,
} from '../types/careerIntelligence.types.js';

interface PopulatedJobDoc {
  _id?: Types.ObjectId;
  title?: string;
  companyName?: string;
  companyLogoUrl?: string;
  location?: string;
  salaryRange?: string;
  skills?: string[];
}

export class CareerIntelligenceRepository {
  async getCareerScore(userId: string): Promise<CareerScoreBreakdown> {
    const profile = await JobSeekerProfile.findOne({ user: userId }).lean<Record<string, unknown>>();
    const resumeCount = await Resume.countDocuments({ user: userId, isDeleted: false });
    const portfolioCount = await Portfolio.countDocuments({ user: userId });

    const profileScore = profile ? 85 : 40;
    const resumeScore = resumeCount > 0 ? 90 : 30;
    const skillsScore = Array.isArray(profile?.skills) && profile.skills.length >= 3 ? 88 : 50;
    const experienceScore = profile?.yearsOfExperience ? Math.min(100, (profile.yearsOfExperience as number) * 15 + 40) : 60;
    const portfolioScore = portfolioCount > 0 ? 92 : 35;

    const overallScore = Math.round(
      profileScore * 0.25 + resumeScore * 0.25 + skillsScore * 0.2 + experienceScore * 0.15 + portfolioScore * 0.15
    );

    return {
      overallScore,
      resumeScore,
      skillsScore,
      profileScore,
      experienceScore,
      portfolioScore,
      percentileRank: Math.min(98, Math.max(50, Math.round(overallScore * 0.95))),
    };
  }

  async getTopJobMatches(userId: string): Promise<JobMatchBreakdown[]> {
    const profile = await JobSeekerProfile.findOne({ user: userId }).lean<Record<string, unknown>>();
    const candidateSkills = (profile?.skills as string[]) || ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'];

    const jobs = await Job.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean<PopulatedJobDoc[]>();

    if (jobs.length === 0) {
      return [
        {
          jobId: 'job_sample_1',
          jobTitle: 'Senior Full Stack Engineer',
          companyName: 'Talentra AI Systems',
          location: 'Remote',
          salaryRange: '$120,000 - $160,000',
          matchPercentage: 94,
          matchingSkills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
          missingSkills: ['Kubernetes'],
          strengths: ['Expertise in full stack TypeScript', 'Proven track record in distributed architecture'],
          improvementAreas: ['Container orchestration with Kubernetes'],
        },
      ];
    }

    return jobs.map((j) => {
      const jobSkills = (j.skills as string[]) || ['React', 'TypeScript', 'Node.js', 'Docker'];
      const matching = jobSkills.filter((s) => candidateSkills.includes(s));
      const missing = jobSkills.filter((s) => !candidateSkills.includes(s));
      const matchPct = Math.min(98, Math.max(65, Math.round((matching.length / Math.max(jobSkills.length, 1)) * 100)));

      return {
        jobId: j._id ? j._id.toString() : 'job_sample',
        jobTitle: j.title || 'Software Position',
        companyName: j.companyName || 'Tech Company',
        companyLogoUrl: j.companyLogoUrl,
        location: j.location || 'Remote',
        salaryRange: j.salaryRange || 'Competitive',
        matchPercentage: matchPct,
        matchingSkills: matching,
        missingSkills: missing,
        strengths: ['Strong core tech stack alignment'],
        improvementAreas: missing.length > 0 ? [`Learn ${missing.join(', ')}`] : [],
      };
    });
  }

  async getSkillsAnalysis(userId: string): Promise<SkillsAnalysisResult> {
    const profile = await JobSeekerProfile.findOne({ user: userId }).lean<Record<string, unknown>>();
    const existing = (profile?.skills as string[]) || ['React', 'TypeScript', 'Node.js', 'Express'];
    const trending = ['System Design', 'Kubernetes', 'GraphQL', 'AWS Architecture', 'AI Engineering'];
    const missing = trending.filter((s) => !existing.includes(s));

    return {
      existingSkills: existing,
      missingSkills: missing,
      trendingSkills: trending,
      transferableSkills: ['Problem Solving', 'Code Review', 'CI/CD Pipelines', 'Technical Leadership'],
      skillGapPercentage: 25,
    };
  }

  async getActiveRoadmap(userId: string): Promise<CareerRoadmapPlan> {
    return {
      id: `plan_${userId}`,
      userId,
      currentRole: 'Senior Full Stack Engineer',
      targetRole: 'Staff / Principal Software Architect',
      milestones: [
        {
          id: 'ms_1',
          title: 'Master Enterprise System Design & Microservices',
          targetRole: 'Lead Engineer',
          timeframe: 'Q3 2026',
          completed: true,
          requiredSkills: ['System Design', 'Domain-Driven Design', 'Kafka'],
          targetCertifications: ['AWS Solutions Architect Associate'],
          recommendedProjects: ['Build Event-Driven Order Processing Engine'],
        },
        {
          id: 'ms_2',
          title: 'Lead Cloud Native Infrastructure & Kubernetes Deployment',
          targetRole: 'Staff Engineer',
          timeframe: 'Q1 2027',
          completed: false,
          requiredSkills: ['Kubernetes', 'Terraform', 'Prometheus/Grafana'],
          targetCertifications: ['CKAD (Certified Kubernetes Application Developer)'],
          recommendedProjects: ['Containerize Microservices with Helm Charts'],
        },
      ],
      updatedAt: new Date().toISOString(),
    };
  }

  async getProfileOptimizationReport(userId: string): Promise<ProfileOptimizationReport> {
    const profile = await JobSeekerProfile.findOne({ user: userId }).lean<Record<string, unknown>>();
    const hasPhoto = Boolean(profile?.avatarUrl);
    const hasResume = Boolean(profile?.resumeUrl);

    const recs: ProfileOptimizationRecommendation[] = [
      {
        id: 'rec_skills',
        category: 'SKILLS',
        title: 'Add System Design & Cloud Certifications',
        description: 'Profiles with 5+ validated skills receive 3.4x more interview invitations from top recruiters.',
        impactScore: 90,
        actionUrl: '/profile/me',
      },
    ];

    if (!hasPhoto) {
      recs.push({
        id: 'rec_photo',
        category: 'VISIBILITY',
        title: 'Upload a Professional Profile Photo',
        description: 'Recruiters are 70% more likely to view profiles with professional avatars.',
        impactScore: 85,
        actionUrl: '/profile/me',
      });
    }

    if (!hasResume) {
      recs.push({
        id: 'rec_resume',
        category: 'SUMMARY',
        title: 'Create an ATS-Friendly Primary Resume',
        description: 'Upload or generate your primary resume version in the Resume Builder.',
        impactScore: 95,
        actionUrl: '/workspace/resume-builder',
      });
    }

    return {
      completenessScore: hasPhoto && hasResume ? 88 : 72,
      recommendations: recs,
    };
  }

  async getProfileVisibilitySettings(userId: string): Promise<ProfileVisibilitySettings> {
    return {
      userId,
      visibilityMode: 'PUBLIC',
      allowRecruiterMessages: true,
      hideCurrentEmployer: false,
      anonymousAlias: 'Senior Developer #8492',
    };
  }
}
