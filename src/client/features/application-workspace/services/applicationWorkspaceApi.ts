import { apiClient } from '../../../services/apiClient';
import {
  ApplicationWorkspacePayload,
  CareerPreferences,
  CareerGoals,
  SavedJobCollection,
} from '../types/applicationWorkspace.types';

export const applicationWorkspaceApi = {
  async getWorkspace(): Promise<ApplicationWorkspacePayload> {
    const response = await apiClient.get<{ success: boolean; data: ApplicationWorkspacePayload }>(
      '/jobseeker/application-workspace'
    );
    return response.data.data;
  },

  async createCollection(name: string, description?: string, color?: string): Promise<SavedJobCollection> {
    const response = await apiClient.post<{ success: boolean; data: SavedJobCollection }>(
      '/jobseeker/application-workspace/collections',
      { name, description, color }
    );
    return response.data.data;
  },

  async updateCareerPreferences(preferences: Partial<CareerPreferences>): Promise<CareerPreferences> {
    const response = await apiClient.patch<{ success: boolean; data: { preferences: CareerPreferences } }>(
      '/jobseeker/application-workspace/career-preferences',
      preferences
    );
    return response.data.data.preferences;
  },

  async updateCareerGoals(goals: Partial<CareerGoals>): Promise<CareerGoals> {
    const response = await apiClient.patch<{ success: boolean; data: { goals: CareerGoals } }>(
      '/jobseeker/application-workspace/career-goals',
      goals
    );
    return response.data.data.goals;
  },
};
