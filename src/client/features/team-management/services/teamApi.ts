import { apiClient } from '../../../services/apiClient';

export interface TeamMemberItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'EMPLOYER' | 'ADMIN';
  avatarUrl?: string;
  createdAt: string;
}

export interface TeamInvitationItem {
  _id: string;
  email: string;
  role: 'EMPLOYER' | 'ADMIN';
  status: string;
  expiresAt: string;
  createdAt: string;
}

export interface DepartmentItem {
  _id: string;
  name: string;
  code?: string;
  description?: string;
}

export interface AuditLogItem {
  _id: string;
  action: string;
  resource: string;
  resourceId?: string;
  createdAt: string;
}

export const teamApi = {
  getTeamMembers: async (): Promise<TeamMemberItem[]> => {
    const res = await apiClient.get('/team/members');
    return res.data.data;
  },

  inviteMember: async (data: { email: string; role?: string; departmentId?: string }): Promise<TeamInvitationItem> => {
    const res = await apiClient.post('/team/invite', data);
    return res.data.data;
  },

  getInvitations: async (): Promise<TeamInvitationItem[]> => {
    const res = await apiClient.get('/team/invitations');
    return res.data.data;
  },

  getDepartments: async (): Promise<DepartmentItem[]> => {
    const res = await apiClient.get('/team/departments');
    return res.data.data;
  },

  createDepartment: async (data: { name: string; code?: string; description?: string }): Promise<DepartmentItem> => {
    const res = await apiClient.post('/team/departments', data);
    return res.data.data;
  },

  getAuditLogs: async (): Promise<AuditLogItem[]> => {
    const res = await apiClient.get('/team/audit-logs');
    return res.data.data;
  },
};
