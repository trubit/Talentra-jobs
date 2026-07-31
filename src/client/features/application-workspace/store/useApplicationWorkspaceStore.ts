import { create } from 'zustand';

interface ApplicationWorkspaceState {
  preferencesModalOpen: boolean;
  createCollectionModalOpen: boolean;
  selectedCollectionId: string | null;
  setPreferencesModalOpen: (open: boolean) => void;
  setCreateCollectionModalOpen: (open: boolean) => void;
  setSelectedCollectionId: (id: string | null) => void;
}

export const useApplicationWorkspaceStore = create<ApplicationWorkspaceState>((set) => ({
  preferencesModalOpen: false,
  createCollectionModalOpen: false,
  selectedCollectionId: null,
  setPreferencesModalOpen: (open) => set({ preferencesModalOpen: open }),
  setCreateCollectionModalOpen: (open) => set({ createCollectionModalOpen: open }),
  setSelectedCollectionId: (id) => set({ selectedCollectionId: id }),
}));
