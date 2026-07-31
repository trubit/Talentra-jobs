import { z } from 'zod';

export const createResumeSchema = z.object({
  title: z.string().min(1, 'Resume title is required').max(100),
  templateId: z.enum(['PROFESSIONAL', 'MODERN', 'EXECUTIVE', 'MINIMAL', 'TECHNICAL', 'CREATIVE']).default('PROFESSIONAL'),
  isPrimary: z.boolean().optional(),
});

export const updateResumeSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  templateId: z.enum(['PROFESSIONAL', 'MODERN', 'EXECUTIVE', 'MINIMAL', 'TECHNICAL', 'CREATIVE']).optional(),
  sections: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(['PERSONAL_INFO', 'SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'CERTIFICATIONS', 'PROJECTS', 'CUSTOM']),
        title: z.string(),
        content: z.record(z.unknown()),
        order: z.number(),
        isVisible: z.boolean(),
      })
    )
    .optional(),
  isPrimary: z.boolean().optional(),
});

export const createCoverLetterSchema = z.object({
  title: z.string().min(1, 'Cover letter title is required').max(100),
  jobCategory: z.string().optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  targetCompany: z.string().optional(),
  targetPosition: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export const createPortfolioProjectSchema = z.object({
  title: z.string().min(1, 'Project title is required').max(100),
  description: z.string().max(1000),
  category: z.string().default('Web Development'),
  projectUrl: z.string().url().optional().or(z.literal('')),
  repositoryUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type CreateResumeDTO = z.infer<typeof createResumeSchema>;
export type UpdateResumeDTO = z.infer<typeof updateResumeSchema>;
export type CreateCoverLetterDTO = z.infer<typeof createCoverLetterSchema>;
export type CreatePortfolioProjectDTO = z.infer<typeof createPortfolioProjectSchema>;
