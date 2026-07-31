import { ApplicationWorkspaceRepository } from '../repositories/applicationWorkspace.repository.js';
import {
  ApplicationWorkspacePayload,
  CareerPreferences,
  CareerGoals,
} from '../types/applicationWorkspace.types.js';
import { retryWithBackoff } from '../../../utils/resilience.js';

export class ApplicationWorkspaceService {
  private repository: ApplicationWorkspaceRepository;

  constructor() {
    this.repository = new ApplicationWorkspaceRepository();
  }

  async getWorkspacePayload(userId: string): Promise<ApplicationWorkspacePayload> {
    return retryWithBackoff(async () => {
      const [applications, collections, careerPreferences, careerGoals, recentlyViewedJobs] =
        await Promise.all([
          this.repository.getApplications(userId),
          this.repository.getCollections(userId),
          this.repository.getCareerPreferences(userId),
          this.repository.getCareerGoals(userId),
          this.repository.getRecentlyViewedJobs(userId),
        ]);

      return {
        applications,
        collections,
        careerPreferences,
        careerGoals,
        recentlyViewedJobs,
      };
    });
  }

  async getCareerPreferences(userId: string): Promise<CareerPreferences> {
    return this.repository.getCareerPreferences(userId);
  }

  async getCareerGoals(userId: string): Promise<CareerGoals> {
    return this.repository.getCareerGoals(userId);
  }
}
