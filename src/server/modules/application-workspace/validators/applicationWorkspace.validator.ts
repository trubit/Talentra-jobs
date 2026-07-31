import { z } from 'zod';

export const createCollectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required').max(50),
  description: z.string().max(200).optional(),
  color: z.string().optional(),
});

export const updateCareerPreferencesSchema = z.object({
  preferredTitles: z.array(z.string()).optional(),
  preferredIndustries: z.array(z.string()).optional(),
  preferredSkills: z.array(z.string()).optional(),
  preferredEmploymentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'ANY']).optional(),
  preferredWorkMode: z.enum(['REMOTE', 'HYBRID', 'ON_SITE', 'ANY']).optional(),
  preferredSalaryRange: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().default('USD'),
    })
    .optional(),
  preferredLocations: z.array(z.string()).optional(),
  openToRelocation: z.boolean().optional(),
  requiresVisaSponsorship: z.boolean().optional(),
});

export const updateCareerGoalsSchema = z.object({
  shortTermGoal: z.string().max(500).optional(),
  longTermGoal: z.string().max(500).optional(),
  desiredRole: z.string().max(100).optional(),
  targetIndustries: z.array(z.string()).optional(),
  skillsToAcquire: z.array(z.string()).optional(),
  targetCertifications: z.array(z.string()).optional(),
});

export type CreateCollectionDTO = z.infer<typeof createCollectionSchema>;
export type UpdateCareerPreferencesDTO = z.infer<typeof updateCareerPreferencesSchema>;
export type UpdateCareerGoalsDTO = z.infer<typeof updateCareerGoalsSchema>;
