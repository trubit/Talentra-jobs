import { CandidateTag, ICandidateTag } from '../../../database/models/CandidateTag.js';
import { CandidateNote, ICandidateNote } from '../../../database/models/CandidateNote.js';
import { RecruiterTask, IRecruiterTask } from '../../../database/models/RecruiterTask.js';
import { SavedSearch, ISavedSearch } from '../../../database/models/SavedSearch.js';
import { JobApplication, IJobApplication } from '../../../database/models/JobApplication.js';

export class WorkspaceRepository {
  async createTag(data: Partial<ICandidateTag>): Promise<ICandidateTag> {
    const tag = new CandidateTag(data);
    return tag.save();
  }

  async getTags(employerId: string): Promise<ICandidateTag[]> {
    return CandidateTag.find({ employer: employerId }).sort({ name: 1 });
  }

  async createTask(data: Partial<IRecruiterTask>): Promise<IRecruiterTask> {
    const task = new RecruiterTask(data);
    return task.save();
  }

  async getTasks(assignedToId: string): Promise<IRecruiterTask[]> {
    return RecruiterTask.find({ assignedTo: assignedToId })
      .sort({ dueDate: 1, createdAt: -1 })
      .populate('application')
      .populate('job', 'title');
  }

  async updateTask(id: string, updates: Partial<IRecruiterTask>): Promise<IRecruiterTask | null> {
    return RecruiterTask.findByIdAndUpdate(id, updates, { new: true });
  }

  async createSavedSearch(data: Partial<ISavedSearch>): Promise<ISavedSearch> {
    const search = new SavedSearch(data);
    return search.save();
  }

  async getSavedSearches(employerId: string): Promise<ISavedSearch[]> {
    return SavedSearch.find({ employer: employerId }).sort({ createdAt: -1 });
  }

  async deleteSavedSearch(id: string, employerId: string): Promise<boolean> {
    const res = await SavedSearch.deleteOne({ _id: id, employer: employerId });
    return res.deletedCount > 0;
  }

  async createNote(data: Partial<ICandidateNote>): Promise<ICandidateNote> {
    const note = new CandidateNote(data);
    return note.save();
  }

  async getNotes(applicationId: string): Promise<ICandidateNote[]> {
    return CandidateNote.find({ application: applicationId })
      .sort({ createdAt: -1 })
      .populate('author', 'firstName lastName email avatarUrl role');
  }

  async compareCandidates(applicationIds: string[]): Promise<IJobApplication[]> {
    return JobApplication.find({ _id: { $in: applicationIds } })
      .populate('applicant', 'firstName lastName email avatarUrl location headline skills education experience')
      .populate('job', 'title city country employmentType');
  }

  async bulkUpdateApplications(applicationIds: string[], update: Record<string, unknown>) {
    return JobApplication.updateMany({ _id: { $in: applicationIds } }, { $set: update });
  }
}
