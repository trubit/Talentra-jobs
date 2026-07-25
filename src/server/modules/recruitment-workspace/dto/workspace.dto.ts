export interface CreateTagDto {
  name: string;
  color?: string;
}

export interface CreateTaskDto {
  assignedToId?: string;
  applicationId?: string;
  jobId?: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface CreateSavedSearchDto {
  title: string;
  filters: Record<string, unknown>;
}

export interface CreateNoteDto {
  content: string;
  mentions?: string[];
}

export interface BulkCandidateActionDto {
  applicationIds: string[];
  action: 'SHORTLIST' | 'REJECT' | 'UNDER_REVIEW' | 'FLAG' | 'UNFLAG';
}

export interface CompareCandidatesDto {
  applicationIds: string[];
}
