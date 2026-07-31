import { Types } from 'mongoose';
import { Resume } from '../../../database/models/Resume.js';
import { Portfolio } from '../../../database/models/Portfolio.js';
import {
  ResumeDocument,
  CoverLetterDocument,
  PortfolioProject,
  ResumeSection,
} from '../types/resumeBuilder.types.js';

interface ResumeQueryResult {
  _id: Types.ObjectId;
  title?: string;
  originalName?: string;
  fileUrl?: string;
  isPrimary?: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface PortfolioQueryResult {
  _id: Types.ObjectId;
  title: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  technologies?: string[];
  featured?: boolean;
  createdAt: Date | string;
}

export class ResumeBuilderRepository {
  async getResumes(userId: string): Promise<ResumeDocument[]> {
    const userObjId = new Types.ObjectId(userId);
    const resumes = await Resume.find({ user: userObjId, isDeleted: false })
      .sort({ createdAt: -1 })
      .lean<ResumeQueryResult[]>();

    if (resumes.length === 0) {
      return [
        {
          id: `res_default_${userId}`,
          userId,
          title: 'Primary Professional Resume',
          templateId: 'PROFESSIONAL',
          sections: this.getDefaultSections(),
          isPrimary: true,
          version: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    }

    return resumes.map((r, index) => ({
      id: r._id.toString(),
      userId,
      title: r.title || r.originalName || `Resume Version ${index + 1}`,
      templateId: 'PROFESSIONAL',
      sections: this.getDefaultSections(),
      isPrimary: Boolean(r.isPrimary),
      version: 1,
      createdAt: new Date(r.createdAt).toISOString(),
      updatedAt: new Date(r.updatedAt).toISOString(),
    }));
  }

  async getCoverLetters(userId: string): Promise<CoverLetterDocument[]> {
    return [
      {
        id: `cl_1_${userId}`,
        userId,
        title: 'Senior Software Engineer Cover Letter',
        jobCategory: 'Engineering',
        content:
          'Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Full Stack Engineer role. With extensive experience in enterprise Node.js, React, and cloud platforms, I am confident in my ability to contribute immediately to your team.',
        targetCompany: 'Enterprise Tech',
        targetPosition: 'Senior Full Stack Engineer',
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async getPortfolioProjects(userId: string): Promise<PortfolioProject[]> {
    const userObjId = new Types.ObjectId(userId);
    const projects = await Portfolio.find({ user: userObjId })
      .sort({ createdAt: -1 })
      .lean<PortfolioQueryResult[]>();

    if (projects.length === 0) {
      return [
        {
          id: `proj_demo_${userId}`,
          userId,
          title: 'Talentra Enterprise Career Platform',
          description: 'Full stack recruitment platform with ATS pipeline and microservices architecture.',
          category: 'Web Development',
          projectUrl: 'https://github.com/trubit/Talentra-jobs',
          repositoryUrl: 'https://github.com/trubit/Talentra-jobs',
          technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker'],
          featured: true,
          order: 1,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return projects.map((p, index) => ({
      id: p._id.toString(),
      userId,
      title: p.title,
      description: p.description,
      category: 'Software Engineering',
      projectUrl: p.projectUrl,
      repositoryUrl: p.githubUrl,
      imageUrl: p.imageUrl,
      technologies: p.technologies || [],
      featured: Boolean(p.featured),
      order: index + 1,
      createdAt: new Date(p.createdAt).toISOString(),
    }));
  }

  private getDefaultSections(): ResumeSection[] {
    return [
      {
        id: 'sec_personal',
        type: 'PERSONAL_INFO',
        title: 'Personal Details',
        content: { name: 'Candidate Name', email: 'candidate@talentra.com', phone: '+1 555-0199' },
        order: 1,
        isVisible: true,
      },
      {
        id: 'sec_summary',
        type: 'SUMMARY',
        title: 'Professional Summary',
        content: { summary: 'Results-driven Senior Full Stack Engineer with 5+ years of experience designing scalable web solutions.' },
        order: 2,
        isVisible: true,
      },
      {
        id: 'sec_skills',
        type: 'SKILLS',
        title: 'Technical Competencies',
        content: { skills: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'REST APIs'] },
        order: 3,
        isVisible: true,
      },
    ];
  }
}
