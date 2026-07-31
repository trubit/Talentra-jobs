import { ResumeBuilderRepository } from '../repositories/resumeBuilder.repository.js';
import {
  ResumeBuilderPayload,
  ResumeDocument,
  CoverLetterDocument,
  PortfolioProject,
} from '../types/resumeBuilder.types.js';
import { retryWithBackoff } from '../../../utils/resilience.js';

export class ResumeBuilderService {
  private repository: ResumeBuilderRepository;

  constructor() {
    this.repository = new ResumeBuilderRepository();
  }

  async getResumeBuilderPayload(userId: string): Promise<ResumeBuilderPayload> {
    return retryWithBackoff(async () => {
      const [resumes, coverLetters, portfolioProjects] = await Promise.all([
        this.repository.getResumes(userId),
        this.repository.getCoverLetters(userId),
        this.repository.getPortfolioProjects(userId),
      ]);

      return {
        resumes,
        coverLetters,
        portfolioProjects,
        activeTemplateId: resumes[0]?.templateId || 'PROFESSIONAL',
      };
    });
  }

  async getResumes(userId: string): Promise<ResumeDocument[]> {
    return this.repository.getResumes(userId);
  }

  async getCoverLetters(userId: string): Promise<CoverLetterDocument[]> {
    return this.repository.getCoverLetters(userId);
  }

  async getPortfolioProjects(userId: string): Promise<PortfolioProject[]> {
    return this.repository.getPortfolioProjects(userId);
  }
}
