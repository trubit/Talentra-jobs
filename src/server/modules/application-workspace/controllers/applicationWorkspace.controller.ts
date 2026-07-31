import { Request, Response, NextFunction } from 'express';
import { ApplicationWorkspaceService } from '../services/applicationWorkspace.service.js';
import {
  createCollectionSchema,
  updateCareerPreferencesSchema,
  updateCareerGoalsSchema,
} from '../validators/applicationWorkspace.validator.js';

export class ApplicationWorkspaceController {
  private service: ApplicationWorkspaceService;

  constructor() {
    this.service = new ApplicationWorkspaceService();
  }

  getWorkspace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getWorkspacePayload(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  createCollection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = createCollectionSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          id: `col_${Date.now()}`,
          ...payload,
          jobCount: 0,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  };

  getCareerPreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getCareerPreferences(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  updateCareerPreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = updateCareerPreferencesSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          message: 'Career preferences updated successfully',
          preferences: payload,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  getCareerGoals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getCareerGoals(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  updateCareerGoals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = updateCareerGoalsSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          message: 'Career goals updated successfully',
          goals: payload,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
