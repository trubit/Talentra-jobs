import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { careerIntelligenceApi } from '../services/careerIntelligenceApi';
import { ProfileVisibilitySettings } from '../types/careerIntelligence.types';

export const CAREER_INTELLIGENCE_QUERY_KEY = ['career-intelligence'];

export function useCareerIntelligence() {
  const queryClient = useQueryClient();

  const intelligenceQuery = useQuery({
    queryKey: CAREER_INTELLIGENCE_QUERY_KEY,
    queryFn: careerIntelligenceApi.getIntelligencePayload,
    staleTime: 1000 * 60 * 5,
  });

  const updateVisibilityMutation = useMutation({
    mutationFn: (settings: Partial<ProfileVisibilitySettings>) =>
      careerIntelligenceApi.updateVisibilitySettings(settings),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CAREER_INTELLIGENCE_QUERY_KEY });
    },
  });

  const createRoadmapMutation = useMutation({
    mutationFn: (plan: { currentRole: string; targetRole: string }) =>
      careerIntelligenceApi.createRoadmapPlan(plan),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CAREER_INTELLIGENCE_QUERY_KEY });
    },
  });

  return {
    ...intelligenceQuery,
    updateVisibility: updateVisibilityMutation.mutateAsync,
    createRoadmap: createRoadmapMutation.mutateAsync,
  };
}
