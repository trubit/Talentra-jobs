import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EmployerDashboardState {
  sidebarCollapsed: boolean;
  selectedCompanyId: string | null;
  compactMode: boolean;
  visibleWidgets: string[];
  toggleSidebar: () => void;
  setSelectedCompanyId: (companyId: string | null) => void;
  setCompactMode: (mode: boolean) => void;
  setVisibleWidgets: (widgets: string[]) => void;
}

export const useEmployerDashboardStore = create<EmployerDashboardState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      selectedCompanyId: null,
      compactMode: false,
      visibleWidgets: ['summary', 'quick_actions', 'activity', 'recent_jobs', 'recent_applications', 'recent_interviews'],

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSelectedCompanyId: (companyId) => set({ selectedCompanyId: companyId }),
      setCompactMode: (mode) => set({ compactMode: mode }),
      setVisibleWidgets: (widgets) => set({ visibleWidgets: widgets }),
    }),
    {
      name: 'talentra-employer-dashboard-store',
    }
  )
);
