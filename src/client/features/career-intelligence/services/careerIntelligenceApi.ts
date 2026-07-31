import { apiClient } from '../../../services/apiClient';
import {
  CareerIntelligencePayload,
  ProfileVisibilitySettings,
  CareerRoadmapPlan,
} from '../types/careerIntelligence.types';

export const careerIntelligenceApi = {
  async getIntelligencePayload(): Promise<CareerIntelligencePayload> {
    const response = await apiClient.get<{ success: boolean; data: CareerIntelligencePayload }>(
      '/career-intelligence'
    );
    return response.data.data;
  },

  async updateVisibilitySettings(settings: Partial<ProfileVisibilitySettings>): Promise<ProfileVisibilitySettings> {
    const response = await apiClient.patch<{
      success: boolean;
      data: { settings: ProfileVisibilitySettings };
    }>('/career-intelligence/profile-visibility', settings);
    return response.data.data.settings;
  },

  async createRoadmapPlan(plan: { currentRole: string; targetRole: string }): Promise<CareerRoadmapPlan> {
    const response = await apiClient.post<{ success: boolean; data: CareerRoadmapPlan }>(
      '/career-intelligence/career-roadmap',
      plan
    );
    return response.data.data;
  },
};
