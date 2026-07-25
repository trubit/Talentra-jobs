import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employerDashboardApi, DashboardPreferences } from '../services/employerDashboardApi';

export function useEmployerDashboardSummary() {
  return useQuery({
    queryKey: ['employer-dashboard-summary'],
    queryFn: employerDashboardApi.getSummary,
    staleTime: 1000 * 60 * 2, // 2 mins
  });
}

export function useEmployerActivityFeed() {
  return useQuery({
    queryKey: ['employer-activity-feed'],
    queryFn: employerDashboardApi.getActivityFeed,
    staleTime: 1000 * 30, // 30s
  });
}

export function useEmployerRecentJobs() {
  return useQuery({
    queryKey: ['employer-recent-jobs'],
    queryFn: employerDashboardApi.getRecentJobs,
  });
}

export function useEmployerRecentApplications() {
  return useQuery({
    queryKey: ['employer-recent-applications'],
    queryFn: employerDashboardApi.getRecentApplications,
  });
}

export function useEmployerRecentInterviews() {
  return useQuery({
    queryKey: ['employer-recent-interviews'],
    queryFn: employerDashboardApi.getRecentInterviews,
  });
}

export function useUpdateDashboardPreferences() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (prefs: Partial<DashboardPreferences>) => employerDashboardApi.updatePreferences(prefs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-dashboard-preferences'] });
    },
  });
}
