import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResumeBuilderService } from '../../../src/server/modules/resume-builder/services/resumeBuilder.service.js';
import { ResumeBuilderRepository } from '../../../src/server/modules/resume-builder/repositories/resumeBuilder.repository.js';

vi.mock('../../../src/server/modules/resume-builder/repositories/resumeBuilder.repository.js');

describe('Resume Builder Suite', () => {
  let service: ResumeBuilderService;
  let mockRepo: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo = {
      getResumes: vi.fn().mockResolvedValue([
        {
          id: 'res_1',
          userId: 'user_123',
          title: 'Primary Professional Resume',
          templateId: 'PROFESSIONAL',
          sections: [],
          isPrimary: true,
          version: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]),
      getCoverLetters: vi.fn().mockResolvedValue([
        {
          id: 'cl_1',
          userId: 'user_123',
          title: 'Senior Software Engineer Cover Letter',
          content: 'Dear Hiring Manager...',
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]),
      getPortfolioProjects: vi.fn().mockResolvedValue([
        {
          id: 'proj_1',
          userId: 'user_123',
          title: 'Talentra Enterprise Career Platform',
          description: 'Full stack recruitment platform',
          category: 'Web Development',
          technologies: ['React', 'TypeScript', 'Node.js'],
          featured: true,
          order: 1,
          createdAt: new Date().toISOString(),
        },
      ]),
    };

    (ResumeBuilderRepository as any).mockImplementation(() => mockRepo);
    service = new ResumeBuilderService();
  });

  it('retrieves resume builder payload with resumes, cover letters, and portfolio projects', async () => {
    const payload = await service.getResumeBuilderPayload('user_123');
    expect(payload.resumes.length).toBe(1);
    expect(payload.coverLetters.length).toBe(1);
    expect(payload.portfolioProjects.length).toBe(1);
    expect(payload.activeTemplateId).toBe('PROFESSIONAL');
  });

  it('retrieves candidate resumes', async () => {
    const resumes = await service.getResumes('user_123');
    expect(resumes[0].title).toBe('Primary Professional Resume');
  });

  it('retrieves cover letter templates', async () => {
    const letters = await service.getCoverLetters('user_123');
    expect(letters[0].isDefault).toBe(true);
  });
});
