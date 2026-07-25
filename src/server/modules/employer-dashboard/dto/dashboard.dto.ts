export interface DashboardSummaryDto {
  activeJobs: number;
  draftJobs: number;
  openPositions: number;
  applicationsReceived: number;
  shortlistedCandidates: number;
  interviewsScheduled: number;
  offersSent: number;
  hiredCandidates: number;
}

export interface UpdatePreferencesDto {
  selectedCompanyId?: string;
  sidebarCollapsed?: boolean;
  visibleWidgets?: string[];
  widgetOrder?: string[];
  compactMode?: boolean;
}
