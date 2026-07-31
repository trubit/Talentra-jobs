import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobseekerDashboardApi } from '../services/jobseekerDashboardApi';
import { JobSeekerDashboardPreferences } from '../types/jobseekerDashboard.types';

export const JOBSEEKER_DASHBOARD_QUERY_KEY = ['jobseeker-dashboard'];

export function useJobSeekerDashboard() {
  const queryClient = useQueryClient();

  const dashboardQuery = useQuery({
    queryKey: JOBSEEKER_DASHBOARD_QUERY_KEY,
    queryFn: jobseekerDashboardApi.getDashboardPayload,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (pref: Partial<JobSeekerDashboardPreferences>) =>
      jobseekerDashboardApi.updatePreferences(pref),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: JOBSEEKER_DASHBOARD_QUERY_KEY });
    },
  });

  return {
    ...dashboardQuery,
    updatePreferences: updatePreferencesMutation.mutateAsync,
    isUpdatingPreferences: updatePreferencesMutation.isPending,
  };
}
