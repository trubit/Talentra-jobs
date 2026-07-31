import { z } from 'zod';

export const updateRoadmapStepSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  targetRole: z.string().min(1).max(100).optional(),
  timeframe: z.string().optional(),
  completed: z.boolean().optional(),
  requiredSkills: z.array(z.string()).optional(),
  targetCertifications: z.array(z.string()).optional(),
  recommendedProjects: z.array(z.string()).optional(),
});

export const createRoadmapPlanSchema = z.object({
  currentRole: z.string().min(1, 'Current role is required').max(100),
  targetRole: z.string().min(1, 'Target role is required').max(100),
  milestones: z.array(updateRoadmapStepSchema).default([]),
});

export const updateVisibilitySettingsSchema = z.object({
  visibilityMode: z.enum(['PUBLIC', 'RECRUITER_ONLY', 'ANONYMOUS', 'HIDDEN']).optional(),
  allowRecruiterMessages: z.boolean().optional(),
  hideCurrentEmployer: z.boolean().optional(),
  anonymousAlias: z.string().max(50).optional(),
});

export type UpdateRoadmapStepDTO = z.infer<typeof updateRoadmapStepSchema>;
export type CreateRoadmapPlanDTO = z.infer<typeof createRoadmapPlanSchema>;
export type UpdateVisibilitySettingsDTO = z.infer<typeof updateVisibilitySettingsSchema>;
