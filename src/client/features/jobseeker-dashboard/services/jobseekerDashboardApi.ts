import { apiClient } from '../../../services/apiClient';
import {
  JobSeekerDashboardPayload,
  DashboardSummaryMetrics,
  ProfileCompletionBreakdown,
  RecentActivityItem,
  JobSeekerDashboardPreferences,
} from '../types/jobseekerDashboard.types';

export const jobseekerDashboardApi = {
  async getDashboardPayload(): Promise<JobSeekerDashboardPayload> {
    const response = await apiClient.get<{ success: boolean; data: JobSeekerDashboardPayload }>(
      '/jobseeker/dashboard'
    );
    return response.data.data;
  },

  async getSummary(): Promise<DashboardSummaryMetrics> {
    const response = await apiClient.get<{ success: boolean; data: DashboardSummaryMetrics }>(
      '/jobseeker/dashboard/summary'
    );
    return response.data.data;
  },

  async getProfileCompletion(): Promise<ProfileCompletionBreakdown> {
    const response = await apiClient.get<{ success: boolean; data: ProfileCompletionBreakdown }>(
      '/jobseeker/dashboard/profile-completion'
    );
    return response.data.data;
  },

  async getActivity(): Promise<RecentActivityItem[]> {
    const response = await apiClient.get<{ success: boolean; data: RecentActivityItem[] }>(
      '/jobseeker/dashboard/activity'
    );
    return response.data.data;
  },

  async updatePreferences(
    preferences: Partial<JobSeekerDashboardPreferences>
  ): Promise<JobSeekerDashboardPreferences> {
    const response = await apiClient.patch<{
      success: boolean;
      data: { preferences: JobSeekerDashboardPreferences };
    }>('/jobseeker/dashboard/preferences', preferences);
    return response.data.data.preferences;
  },
};
