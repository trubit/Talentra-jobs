import { z } from 'zod';

export const updateDashboardPreferencesSchema = z.object({
  layoutMode: z.enum(['COMPACT', 'COMFORTABLE', 'SPACIOUS']).optional(),
  visibleWidgets: z
    .object({
      summaryCards: z.boolean().optional(),
      profileCompletion: z.boolean().optional(),
      recentActivity: z.boolean().optional(),
      savedJobs: z.boolean().optional(),
      recommendedJobs: z.boolean().optional(),
      interviews: z.boolean().optional(),
      careerProgress: z.boolean().optional(),
    })
    .optional(),
  emailAlertsEnabled: z.boolean().optional(),
  themePreference: z.enum(['LIGHT', 'DARK', 'SYSTEM']).optional(),
});

export type UpdateDashboardPreferencesDTO = z.infer<typeof updateDashboardPreferencesSchema>;
