import { WorkspaceRepository } from '../repositories/workspace.repository.js';
import {
  CreateTagDto,
  CreateTaskDto,
  CreateSavedSearchDto,
  CreateNoteDto,
  BulkCandidateActionDto,
} from '../dto/workspace.dto.js';
import { AppError } from '../../../utils/AppError.js';
import { domainEventBus } from '../../../events/domainEvents.js';

export class WorkspaceService {
  private repo = new WorkspaceRepository();

  async createTag(employerId: string, dto: CreateTagDto) {
    return this.repo.createTag({
      employer: employerId as never,
      name: dto.name,
      color: dto.color || '#3b82f6',
    });
  }

  async getTags(employerId: string) {
    return this.repo.getTags(employerId);
  }

  async createTask(employerId: string, dto: CreateTaskDto) {
    return this.repo.createTask({
      employer: employerId as never,
      assignedTo: (dto.assignedToId || employerId) as never,
      application: dto.applicationId as never,
      job: dto.jobId as never,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      priority: dto.priority || 'MEDIUM',
      status: 'PENDING',
    });
  }

  async getTasks(userId: string) {
    return this.repo.getTasks(userId);
  }

  async updateTaskStatus(taskId: string, status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED') {
    const updated = await this.repo.updateTask(taskId, { status });
    if (!updated) {
      throw new AppError('Task not found', 404, 'NOT_FOUND');
    }
    return updated;
  }

  async createSavedSearch(employerId: string, dto: CreateSavedSearchDto) {
    return this.repo.createSavedSearch({
      employer: employerId as never,
      title: dto.title,
      filters: dto.filters,
    });
  }

  async getSavedSearches(employerId: string) {
    return this.repo.getSavedSearches(employerId);
  }

  async deleteSavedSearch(id: string, employerId: string) {
    const deleted = await this.repo.deleteSavedSearch(id, employerId);
    if (!deleted) {
      throw new AppError('Saved search not found', 404, 'NOT_FOUND');
    }
    return { success: true };
  }

  async createNote(applicationId: string, authorId: string, dto: CreateNoteDto) {
    return this.repo.createNote({
      application: applicationId as never,
      author: authorId as never,
      content: dto.content,
      mentions: (dto.mentions || []) as never[],
      isPrivate: true,
    });
  }

  async getNotes(applicationId: string) {
    return this.repo.getNotes(applicationId);
  }

  async compareCandidates(applicationIds: string[]) {
    if (!applicationIds || applicationIds.length < 2) {
      throw new AppError('Select at least 2 candidates for side-by-side comparison', 400, 'BAD_REQUEST');
    }
    return this.repo.compareCandidates(applicationIds);
  }

  async bulkActions(actorId: string, dto: BulkCandidateActionDto) {
    const { applicationIds, action } = dto;
    if (!applicationIds || applicationIds.length === 0) {
      throw new AppError('No application IDs provided for bulk action', 400, 'BAD_REQUEST');
    }

    let updatePayload: Record<string, unknown> = {};

    switch (action) {
      case 'SHORTLIST':
        updatePayload = { status: 'SHORTLISTED' };
        break;
      case 'REJECT':
        updatePayload = { status: 'REJECTED' };
        break;
      case 'UNDER_REVIEW':
        updatePayload = { status: 'UNDER_REVIEW' };
        break;
      case 'FLAG':
        updatePayload = { flagged: true };
        break;
      case 'UNFLAG':
        updatePayload = { flagged: false };
        break;
      default:
        throw new AppError('Invalid bulk action', 400, 'BAD_REQUEST');
    }

    await this.repo.bulkUpdateApplications(applicationIds, updatePayload);

    applicationIds.forEach((appId) => {
      domainEventBus.publish({
        eventType: 'STATUS_CHANGED',
        applicationId: appId,
        actorId,
        payload: { bulkAction: action },
      });
    });

    return { updatedCount: applicationIds.length, action };
  }
}
