export interface CreateAutomationRuleDto {
  title: string;
  trigger: 'JOB_EXPIRED' | 'APPLICATION_RECEIVED' | 'TASK_OVERDUE' | 'STAGE_UNCHANGED';
  action: string;
  config?: Record<string, unknown>;
}

export interface EmployerAnalyticsResponseDto {
  totalJobs: number;
  activeJobs: number;
  closedJobs: number;
  totalApplications: number;
  shortlistedCount: number;
  interviewCount: number;
  offerCount: number;
  hiredCount: number;
  conversionRate: number;
  averageTimeToHireDays: number;
}
