import { apiClient } from '../../../services/apiClient';
import {
  ResumeBuilderPayload,
  ResumeDocument,
  CoverLetterDocument,
  PortfolioProject,
} from '../types/resumeBuilder.types';

export const resumeBuilderApi = {
  async getBuilderPayload(): Promise<ResumeBuilderPayload> {
    const response = await apiClient.get<{ success: boolean; data: ResumeBuilderPayload }>(
      '/jobseeker/resume-builder'
    );
    return response.data.data;
  },

  async createResume(title: string, templateId = 'PROFESSIONAL', isPrimary = false): Promise<ResumeDocument> {
    const response = await apiClient.post<{ success: boolean; data: ResumeDocument }>(
      '/jobseeker/resume-builder',
      { title, templateId, isPrimary }
    );
    return response.data.data;
  },

  async generateShareToken(resumeId: string): Promise<{ shareToken: string; shareUrl: string; expiresAt: string }> {
    const response = await apiClient.post<{
      success: boolean;
      data: { shareToken: string; shareUrl: string; expiresAt: string };
    }>(`/jobseeker/resume-builder/${resumeId}/share`);
    return response.data.data;
  },

  async createCoverLetter(coverLetter: {
    title: string;
    content: string;
    targetCompany?: string;
    targetPosition?: string;
    isDefault?: boolean;
  }): Promise<CoverLetterDocument> {
    const response = await apiClient.post<{ success: boolean; data: CoverLetterDocument }>(
      '/jobseeker/resume-builder/cover-letters',
      coverLetter
    );
    return response.data.data;
  },

  async createPortfolioProject(project: {
    title: string;
    description: string;
    category?: string;
    projectUrl?: string;
    repositoryUrl?: string;
    technologies?: string[];
    featured?: boolean;
  }): Promise<PortfolioProject> {
    const response = await apiClient.post<{ success: boolean; data: PortfolioProject }>(
      '/jobseeker/resume-builder/portfolio',
      project
    );
    return response.data.data;
  },
};
