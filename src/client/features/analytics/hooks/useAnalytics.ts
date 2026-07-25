import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analyticsApi } from '../services/analyticsApi';

export function useEmployerAnalytics() {
  return useQuery({
    queryKey: ['employer-analytics'],
    queryFn: analyticsApi.getMetrics,
  });
}

export function useRecruiterProductivity() {
  return useQuery({
    queryKey: ['employer-productivity'],
    queryFn: analyticsApi.getProductivity,
  });
}

export function useAutomationRules() {
  return useQuery({
    queryKey: ['employer-automation-rules'],
    queryFn: analyticsApi.getAutomationRules,
  });
}

export function useCreateAutomationRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: analyticsApi.createAutomationRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-automation-rules'] });
    },
  });
}

export function useToggleAutomationRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isEnabled }: { id: string; isEnabled: boolean }) => analyticsApi.toggleAutomationRule(id, isEnabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-automation-rules'] });
    },
  });
}
