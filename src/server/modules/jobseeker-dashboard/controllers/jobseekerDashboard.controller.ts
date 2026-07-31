import { Request, Response, NextFunction } from 'express';
import { JobSeekerDashboardService } from '../services/jobseekerDashboard.service.js';
import { updateDashboardPreferencesSchema } from '../validators/jobseekerDashboard.validator.js';

export class JobSeekerDashboardController {
  private service: JobSeekerDashboardService;

  constructor() {
    this.service = new JobSeekerDashboardService();
  }

  getDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getDashboardPayload(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getSummary(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getProfileCompletion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getProfileCompletion(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getActivity(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  updatePreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = updateDashboardPreferencesSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          message: 'Dashboard preferences updated successfully',
          preferences: payload,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
