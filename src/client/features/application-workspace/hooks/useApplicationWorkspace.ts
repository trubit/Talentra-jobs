import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationWorkspaceApi } from '../services/applicationWorkspaceApi';
import { CareerPreferences, CareerGoals } from '../types/applicationWorkspace.types';

export const WORKSPACE_QUERY_KEY = ['application-workspace'];

export function useApplicationWorkspace() {
  const queryClient = useQueryClient();

  const workspaceQuery = useQuery({
    queryKey: WORKSPACE_QUERY_KEY,
    queryFn: applicationWorkspaceApi.getWorkspace,
    staleTime: 1000 * 60 * 5,
  });

  const createCollectionMutation = useMutation({
    mutationFn: ({ name, description, color }: { name: string; description?: string; color?: string }) =>
      applicationWorkspaceApi.createCollection(name, description, color),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WORKSPACE_QUERY_KEY });
    },
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (pref: Partial<CareerPreferences>) => applicationWorkspaceApi.updateCareerPreferences(pref),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WORKSPACE_QUERY_KEY });
    },
  });

  const updateGoalsMutation = useMutation({
    mutationFn: (goals: Partial<CareerGoals>) => applicationWorkspaceApi.updateCareerGoals(goals),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WORKSPACE_QUERY_KEY });
    },
  });

  return {
    ...workspaceQuery,
    createCollection: createCollectionMutation.mutateAsync,
    updatePreferences: updatePreferencesMutation.mutateAsync,
    updateGoals: updateGoalsMutation.mutateAsync,
  };
}
