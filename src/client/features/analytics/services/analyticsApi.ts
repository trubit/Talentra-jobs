import { apiClient } from '../../../services/apiClient';

export interface EmployerAnalyticsData {
  totalJobs: number;
  activeJobs: number;
  closedJobs: number;
  totalApplications: number;
  shortlistedCount: number;
  interviewCount: number;
  offerCount: number;
  hiredCount: number;
  conversionRate: number;
  averageTimeToHireDays: number;
}

export interface ProductivityData {
  applicationsReviewed: number;
  hiresCompleted: number;
  averageResponseTimeHours: number;
}

export interface AutomationRuleItem {
  _id: string;
  title: string;
  trigger: string;
  action: string;
  isEnabled: boolean;
}

export const analyticsApi = {
  getMetrics: async (): Promise<EmployerAnalyticsData> => {
    const res = await apiClient.get('/employer/analytics');
    return res.data.data;
  },

  getProductivity: async (): Promise<ProductivityData> => {
    const res = await apiClient.get('/employer/analytics/productivity');
    return res.data.data;
  },

  getAutomationRules: async (): Promise<AutomationRuleItem[]> => {
    const res = await apiClient.get('/employer/analytics/automation');
    return res.data.data;
  },

  createAutomationRule: async (data: { title: string; trigger: string; action: string }) => {
    const res = await apiClient.post('/employer/analytics/automation', data);
    return res.data.data;
  },

  toggleAutomationRule: async (id: string, isEnabled: boolean) => {
    const res = await apiClient.patch(`/employer/analytics/automation/${id}`, { isEnabled });
    return res.data.data;
  },
};
