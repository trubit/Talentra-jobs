import { CareerIntelligenceRepository } from '../repositories/careerIntelligence.repository.js';
import { AIProviderFactory } from './aiProviderFactory.js';
import {
  CareerIntelligencePayload,
  CareerScoreBreakdown,
  JobMatchBreakdown,
  SkillsAnalysisResult,
  CareerRoadmapPlan,
  ProfileOptimizationReport,
  ProfileVisibilitySettings,
} from '../types/careerIntelligence.types.js';
import { retryWithBackoff } from '../../../utils/resilience.js';

export class CareerIntelligenceService {
  private repository: CareerIntelligenceRepository;

  constructor() {
    this.repository = new CareerIntelligenceRepository();
  }

  async getCareerIntelligencePayload(userId: string): Promise<CareerIntelligencePayload> {
    return retryWithBackoff(async () => {
      const [careerScore, topJobMatches, skillsAnalysis, activeRoadmap, optimizationReport, visibilitySettings] =
        await Promise.all([
          this.repository.getCareerScore(userId),
          this.repository.getTopJobMatches(userId),
          this.repository.getSkillsAnalysis(userId),
          this.repository.getActiveRoadmap(userId),
          this.repository.getProfileOptimizationReport(userId),
          this.repository.getProfileVisibilitySettings(userId),
        ]);

      return {
        careerScore,
        topJobMatches,
        skillsAnalysis,
        activeRoadmap,
        optimizationReport,
        visibilitySettings,
      };
    });
  }

  async getJobMatches(userId: string): Promise<JobMatchBreakdown[]> {
    return this.repository.getTopJobMatches(userId);
  }

  async getCareerScore(userId: string): Promise<CareerScoreBreakdown> {
    return this.repository.getCareerScore(userId);
  }

  async getSkillsAnalysis(userId: string): Promise<SkillsAnalysisResult> {
    const aiProvider = AIProviderFactory.getProvider();
    const repoSkills = await this.repository.getSkillsAnalysis(userId);
    const aiSkills = await aiProvider.analyzeSkills(repoSkills.existingSkills, 'Software Architect');

    return {
      ...repoSkills,
      missingSkills: aiSkills.missingSkills,
      trendingSkills: aiSkills.trendingSkills,
    };
  }

  async getCareerRoadmap(userId: string): Promise<CareerRoadmapPlan> {
    return this.repository.getActiveRoadmap(userId);
  }

  async getProfileOptimization(userId: string): Promise<ProfileOptimizationReport> {
    return this.repository.getProfileOptimizationReport(userId);
  }

  async getProfileVisibility(userId: string): Promise<ProfileVisibilitySettings> {
    return this.repository.getProfileVisibilitySettings(userId);
  }
}
