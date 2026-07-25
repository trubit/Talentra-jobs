import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recruitmentWorkspaceApi } from '../services/recruitmentWorkspaceApi';

export function useRecruiterTasks() {
  return useQuery({
    queryKey: ['recruiter-tasks'],
    queryFn: recruitmentWorkspaceApi.getTasks,
  });
}

export function useCreateRecruiterTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recruitmentWorkspaceApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruiter-tasks'] });
    },
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => recruitmentWorkspaceApi.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruiter-tasks'] });
    },
  });
}

export function useCandidateNotes(applicationId: string) {
  return useQuery({
    queryKey: ['candidate-notes', applicationId],
    queryFn: () => recruitmentWorkspaceApi.getNotes(applicationId),
    enabled: Boolean(applicationId),
  });
}

export function useCreateCandidateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, content }: { applicationId: string; content: string }) =>
      recruitmentWorkspaceApi.createNote(applicationId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidate-notes', variables.applicationId] });
    },
  });
}

export function useCompareCandidates() {
  return useMutation({
    mutationFn: (applicationIds: string[]) => recruitmentWorkspaceApi.compareCandidates(applicationIds),
  });
}
