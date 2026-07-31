import { create } from 'zustand';

interface CareerIntelligenceState {
  visibilityModalOpen: boolean;
  roadmapModalOpen: boolean;
  setVisibilityModalOpen: (open: boolean) => void;
  setRoadmapModalOpen: (open: boolean) => void;
}

export const useCareerIntelligenceStore = create<CareerIntelligenceState>((set) => ({
  visibilityModalOpen: false,
  roadmapModalOpen: false,
  setVisibilityModalOpen: (open) => set({ visibilityModalOpen: open }),
  setRoadmapModalOpen: (open) => set({ roadmapModalOpen: open }),
}));
