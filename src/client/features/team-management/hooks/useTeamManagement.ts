import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '../services/teamApi';

export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: teamApi.getTeamMembers,
  });
}

export function useTeamInvitations() {
  return useQuery({
    queryKey: ['team-invitations'],
    queryFn: teamApi.getInvitations,
  });
}

export function useInviteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teamApi.inviteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      queryClient.invalidateQueries({ queryKey: ['team-audit-logs'] });
    },
  });
}

export function useDepartments() {
  return useQuery({
    queryKey: ['team-departments'],
    queryFn: teamApi.getDepartments,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teamApi.createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-departments'] });
      queryClient.invalidateQueries({ queryKey: ['team-audit-logs'] });
    },
  });
}

export function useAuditLogs() {
  return useQuery({
    queryKey: ['team-audit-logs'],
    queryFn: teamApi.getAuditLogs,
  });
}
