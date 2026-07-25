import { apiClient } from '../../../services/apiClient';

export interface DashboardSummaryData {
  activeJobs: number;
  draftJobs: number;
  openPositions: number;
  applicationsReceived: number;
  shortlistedCandidates: number;
  interviewsScheduled: number;
  offersSent: number;
  hiredCandidates: number;
}

export interface ActivityItem {
  _id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardPreferences {
  sidebarCollapsed: boolean;
  visibleWidgets: string[];
  widgetOrder: string[];
  compactMode: boolean;
}

export const employerDashboardApi = {
  getSummary: async (): Promise<DashboardSummaryData> => {
    const res = await apiClient.get('/employer/dashboard/summary');
    return res.data.data;
  },

  getActivityFeed: async (): Promise<ActivityItem[]> => {
    const res = await apiClient.get('/employer/dashboard/activity');
    return res.data.data;
  },

  getRecentJobs: async () => {
    const res = await apiClient.get('/employer/dashboard/recent-jobs');
    return res.data.data;
  },

  getRecentApplications: async () => {
    const res = await apiClient.get('/employer/dashboard/recent-applications');
    return res.data.data;
  },

  getRecentInterviews: async () => {
    const res = await apiClient.get('/employer/dashboard/recent-interviews');
    return res.data.data;
  },

  search: async (query: string) => {
    const res = await apiClient.get('/employer/dashboard/search', { params: { q: query } });
    return res.data.data;
  },

  getPreferences: async (): Promise<DashboardPreferences> => {
    const res = await apiClient.get('/employer/dashboard/preferences');
    return res.data.data;
  },

  updatePreferences: async (prefs: Partial<DashboardPreferences>): Promise<DashboardPreferences> => {
    const res = await apiClient.put('/employer/dashboard/preferences', prefs);
    return res.data.data;
  },
};
