import { create } from 'zustand';

interface ResumeBuilderState {
  activeTab: 'RESUMES' | 'COVER_LETTERS' | 'PORTFOLIO';
  selectedResumeId: string | null;
  selectedTemplateId: string;
  createCoverLetterModalOpen: boolean;
  createPortfolioModalOpen: boolean;
  setActiveTab: (tab: 'RESUMES' | 'COVER_LETTERS' | 'PORTFOLIO') => void;
  setSelectedResumeId: (id: string | null) => void;
  setSelectedTemplateId: (id: string) => void;
  setCreateCoverLetterModalOpen: (open: boolean) => void;
  setCreatePortfolioModalOpen: (open: boolean) => void;
}

export const useResumeBuilderStore = create<ResumeBuilderState>((set) => ({
  activeTab: 'RESUMES',
  selectedResumeId: null,
  selectedTemplateId: 'PROFESSIONAL',
  createCoverLetterModalOpen: false,
  createPortfolioModalOpen: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedResumeId: (id) => set({ selectedResumeId: id }),
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  setCreateCoverLetterModalOpen: (open) => set({ createCoverLetterModalOpen: open }),
  setCreatePortfolioModalOpen: (open) => set({ createPortfolioModalOpen: open }),
}));
