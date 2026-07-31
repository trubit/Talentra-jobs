import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeBuilderApi } from '../services/resumeBuilderApi';

export const RESUME_BUILDER_QUERY_KEY = ['resume-builder'];

export function useResumeBuilder() {
  const queryClient = useQueryClient();

  const builderQuery = useQuery({
    queryKey: RESUME_BUILDER_QUERY_KEY,
    queryFn: resumeBuilderApi.getBuilderPayload,
    staleTime: 1000 * 60 * 5,
  });

  const createResumeMutation = useMutation({
    mutationFn: ({ title, templateId, isPrimary }: { title: string; templateId?: string; isPrimary?: boolean }) =>
      resumeBuilderApi.createResume(title, templateId, isPrimary),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: RESUME_BUILDER_QUERY_KEY });
    },
  });

  const generateShareTokenMutation = useMutation({
    mutationFn: (resumeId: string) => resumeBuilderApi.generateShareToken(resumeId),
  });

  const createCoverLetterMutation = useMutation({
    mutationFn: (coverLetter: { title: string; content: string; targetCompany?: string; targetPosition?: string }) =>
      resumeBuilderApi.createCoverLetter(coverLetter),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: RESUME_BUILDER_QUERY_KEY });
    },
  });

  const createPortfolioProjectMutation = useMutation({
    mutationFn: (project: { title: string; description: string; category?: string; projectUrl?: string; technologies?: string[] }) =>
      resumeBuilderApi.createPortfolioProject(project),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: RESUME_BUILDER_QUERY_KEY });
    },
  });

  return {
    ...builderQuery,
    createResume: createResumeMutation.mutateAsync,
    generateShareToken: generateShareTokenMutation.mutateAsync,
    createCoverLetter: createCoverLetterMutation.mutateAsync,
    createPortfolioProject: createPortfolioProjectMutation.mutateAsync,
  };
}
