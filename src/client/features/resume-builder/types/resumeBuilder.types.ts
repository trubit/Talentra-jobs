export interface ResumeSection {
  id: string;
  type: 'PERSONAL_INFO' | 'SUMMARY' | 'EXPERIENCE' | 'EDUCATION' | 'SKILLS' | 'CERTIFICATIONS' | 'PROJECTS' | 'CUSTOM';
  title: string;
  content: Record<string, unknown>;
  order: number;
  isVisible: boolean;
}

export interface ResumeDocument {
  id: string;
  userId: string;
  title: string;
  templateId: 'PROFESSIONAL' | 'MODERN' | 'EXECUTIVE' | 'MINIMAL' | 'TECHNICAL' | 'CREATIVE';
  sections: ResumeSection[];
  isPrimary: boolean;
  version: number;
  shareToken?: string;
  shareExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetterDocument {
  id: string;
  userId: string;
  title: string;
  jobCategory?: string;
  content: string;
  targetCompany?: string;
  targetPosition?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  projectUrl?: string;
  repositoryUrl?: string;
  imageUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface ResumeBuilderPayload {
  resumes: ResumeDocument[];
  coverLetters: CoverLetterDocument[];
  portfolioProjects: PortfolioProject[];
  activeTemplateId: string;
}
