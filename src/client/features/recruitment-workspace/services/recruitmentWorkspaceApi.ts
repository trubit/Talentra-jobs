import { apiClient } from '../../../services/apiClient';

export interface RecruiterTaskItem {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  job?: { title?: string };
}

export interface CandidateNoteItem {
  _id: string;
  content: string;
  author: { firstName: string; lastName: string; avatarUrl?: string; role: string };
  createdAt: string;
}

export const recruitmentWorkspaceApi = {
  getTasks: async (): Promise<RecruiterTaskItem[]> => {
    const res = await apiClient.get('/recruitment-workspace/tasks');
    return res.data.data;
  },

  createTask: async (data: { title: string; description?: string; dueDate?: string; priority?: string }) => {
    const res = await apiClient.post('/recruitment-workspace/tasks', data);
    return res.data.data;
  },

  updateTaskStatus: async (id: string, status: string) => {
    const res = await apiClient.patch(`/recruitment-workspace/tasks/${id}`, { status });
    return res.data.data;
  },

  getNotes: async (applicationId: string): Promise<CandidateNoteItem[]> => {
    const res = await apiClient.get(`/recruitment-workspace/notes/${applicationId}`);
    return res.data.data;
  },

  createNote: async (applicationId: string, content: string) => {
    const res = await apiClient.post(`/recruitment-workspace/notes/${applicationId}`, { content });
    return res.data.data;
  },

  compareCandidates: async (applicationIds: string[]) => {
    const res = await apiClient.post('/recruitment-workspace/candidate-comparison', { applicationIds });
    return res.data.data;
  },

  bulkActions: async (applicationIds: string[], action: string) => {
    const res = await apiClient.post('/recruitment-workspace/bulk-actions', { applicationIds, action });
    return res.data.data;
  },
};
