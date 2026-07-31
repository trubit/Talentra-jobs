import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CareerIntelligenceService } from '../../../src/server/modules/career-intelligence/services/careerIntelligence.service.js';
import { CareerIntelligenceRepository } from '../../../src/server/modules/career-intelligence/repositories/careerIntelligence.repository.js';
import { AIProviderFactory } from '../../../src/server/modules/career-intelligence/services/aiProviderFactory.js';

vi.mock('../../../src/server/modules/career-intelligence/repositories/careerIntelligence.repository.js');

describe('Career Intelligence Suite', () => {
  let service: CareerIntelligenceService;
  let mockRepo: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo = {
      getCareerScore: vi.fn().mockResolvedValue({
        overallScore: 88,
        resumeScore: 90,
        skillsScore: 85,
        profileScore: 80,
        experienceScore: 92,
        portfolioScore: 88,
        percentileRank: 95,
      }),
      getTopJobMatches: vi.fn().mockResolvedValue([
        {
          jobId: 'job_1',
          jobTitle: 'Senior Software Engineer',
          companyName: 'Talentra',
          matchPercentage: 92,
          matchingSkills: ['React', 'TypeScript'],
          missingSkills: ['Kubernetes'],
          strengths: ['Strong React foundation'],
          improvementAreas: ['Cloud orchestration'],
        },
      ]),
      getSkillsAnalysis: vi.fn().mockResolvedValue({
        existingSkills: ['React', 'TypeScript', 'Node.js'],
        missingSkills: ['Kubernetes'],
        trendingSkills: ['System Design', 'Kubernetes'],
        transferableSkills: ['Problem Solving'],
        skillGapPercentage: 25,
      }),
      getActiveRoadmap: vi.fn().mockResolvedValue({
        id: 'plan_1',
        userId: 'user_123',
        currentRole: 'Senior Full Stack Engineer',
        targetRole: 'Staff Software Architect',
        milestones: [],
        updatedAt: new Date().toISOString(),
      }),
      getProfileOptimizationReport: vi.fn().mockResolvedValue({
        completenessScore: 88,
        recommendations: [],
      }),
      getProfileVisibilitySettings: vi.fn().mockResolvedValue({
        userId: 'user_123',
        visibilityMode: 'PUBLIC',
        allowRecruiterMessages: true,
        hideCurrentEmployer: false,
      }),
    };

    (CareerIntelligenceRepository as any).mockImplementation(() => mockRepo);
    service = new CareerIntelligenceService();
  });

  it('retrieves full career intelligence payload', async () => {
    const payload = await service.getCareerIntelligencePayload('user_123');
    expect(payload.careerScore.overallScore).toBe(88);
    expect(payload.topJobMatches.length).toBe(1);
    expect(payload.visibilitySettings.visibilityMode).toBe('PUBLIC');
  });

  it('instantiates provider-agnostic AI adapter', () => {
    const provider = AIProviderFactory.getProvider();
    expect(provider.providerName).toBe('StubDeterministicAI');
  });

  it('performs skills gap analysis', async () => {
    const skills = await service.getSkillsAnalysis('user_123');
    expect(skills.existingSkills).toContain('React');
    expect(skills.trendingSkills.length).toBeGreaterThan(0);
  });
});
