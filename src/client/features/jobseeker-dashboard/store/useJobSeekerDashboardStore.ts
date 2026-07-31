import { create } from 'zustand';
import { JobSeekerDashboardPreferences } from '../types/jobseekerDashboard.types';

interface JobSeekerDashboardState {
  preferencesModalOpen: boolean;
  preferences: JobSeekerDashboardPreferences;
  setPreferencesModalOpen: (open: boolean) => void;
  updatePreferences: (pref: Partial<JobSeekerDashboardPreferences>) => void;
}

export const useJobSeekerDashboardStore = create<JobSeekerDashboardState>((set) => ({
  preferencesModalOpen: false,
  preferences: {
    layoutMode: 'COMFORTABLE',
    visibleWidgets: {
      summaryCards: true,
      profileCompletion: true,
      recentActivity: true,
      savedJobs: true,
      recommendedJobs: true,
      interviews: true,
      careerProgress: true,
    },
    emailAlertsEnabled: true,
    themePreference: 'SYSTEM',
  },
  setPreferencesModalOpen: (open) => set({ preferencesModalOpen: open }),
  updatePreferences: (pref) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...pref,
        visibleWidgets: {
          ...state.preferences.visibleWidgets,
          ...pref.visibleWidgets,
        },
      },
    })),
}));
