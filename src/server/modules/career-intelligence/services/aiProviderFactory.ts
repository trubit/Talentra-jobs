import { AIProviderAdapter, SkillsAnalysisResult, JobMatchBreakdown } from '../types/careerIntelligence.types.js';
import { logger } from '../../../utils/logger.js';

export class DeterministicStubAIProvider implements AIProviderAdapter {
  providerName = 'StubDeterministicAI';

  async analyzeSkills(skills: string[], _targetRole: string): Promise<SkillsAnalysisResult> {
    const defaultTrending = ['System Design', 'Kubernetes', 'GraphQL', 'AWS Cloud Architecture', 'AI Engineering'];
    const transferable = ['Problem Solving', 'Code Review', 'CI/CD Pipelines', 'Agile Leadership'];
    const missing = defaultTrending.filter((s) => !skills.includes(s));

    return {
      existingSkills: skills,
      missingSkills: missing,
      trendingSkills: defaultTrending,
      transferableSkills: transferable,
      skillGapPercentage: Math.max(10, Math.round((missing.length / defaultTrending.length) * 100)),
    };
  }

  async calculateJobMatch(
    candidateProfile: Record<string, unknown>,
    jobDescription: Record<string, unknown>
  ): Promise<JobMatchBreakdown> {
    const userSkills = (candidateProfile.skills as string[]) || ['React', 'TypeScript', 'Node.js'];
    const reqSkills = (jobDescription.skills as string[]) || ['React', 'TypeScript', 'Node.js', 'Docker', 'Kubernetes'];

    const matching = reqSkills.filter((s) => userSkills.includes(s));
    const missing = reqSkills.filter((s) => !userSkills.includes(s));
    const matchPercentage = Math.round((matching.length / Math.max(reqSkills.length, 1)) * 100);

    return {
      jobId: (jobDescription._id as string) || 'job_sample',
      jobTitle: (jobDescription.title as string) || 'Senior Full Stack Engineer',
      companyName: (jobDescription.companyName as string) || 'Enterprise Software Inc',
      matchPercentage,
      matchingSkills: matching,
      missingSkills: missing,
      strengths: ['Strong core JavaScript & TypeScript foundation', 'Extensive React frontend experience'],
      improvementAreas: missing.length > 0 ? [`Acquire hands-on experience in ${missing.join(', ')}`] : ['Maintain active open source contributions'],
    };
  }
}

export class AIProviderFactory {
  static getProvider(): AIProviderAdapter {
    const providerEnv = process.env.AI_PROVIDER || 'stub';
    logger.info(`🤖 AI Provider Layer initialized with provider: [${providerEnv}]`);

    switch (providerEnv.toLowerCase()) {
      case 'openai':
      case 'anthropic':
      case 'gemini':
      case 'azure':
      default:
        return new DeterministicStubAIProvider();
    }
  }
}
