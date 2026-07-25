import { AnalyticsRepository } from '../repositories/analytics.repository.js';
import { CreateAutomationRuleDto } from '../dto/analytics.dto.js';
import { AppError } from '../../../utils/AppError.js';

export class AnalyticsService {
  private repo = new AnalyticsRepository();

  async getMetrics(employerId: string) {
    return this.repo.getMetrics(employerId);
  }

  async getProductivity(employerId: string) {
    return this.repo.getProductivity(employerId);
  }

  async createAutomationRule(employerId: string, dto: CreateAutomationRuleDto) {
    return this.repo.createAutomationRule({
      employer: employerId as never,
      title: dto.title,
      trigger: dto.trigger,
      action: dto.action,
      config: dto.config || {},
      isEnabled: true,
    });
  }

  async getAutomationRules(employerId: string) {
    return this.repo.getAutomationRules(employerId);
  }

  async toggleAutomationRule(id: string, isEnabled: boolean) {
    const updated = await this.repo.toggleAutomationRule(id, isEnabled);
    if (!updated) {
      throw new AppError('Automation rule not found', 404, 'NOT_FOUND');
    }
    return updated;
  }
}
