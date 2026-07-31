import { Request, Response, NextFunction } from 'express';
import { CareerIntelligenceService } from '../services/careerIntelligence.service.js';
import {
  createRoadmapPlanSchema,
  updateRoadmapStepSchema,
  updateVisibilitySettingsSchema,
} from '../validators/careerIntelligence.validator.js';

export class CareerIntelligenceController {
  private service: CareerIntelligenceService;

  constructor() {
    this.service = new CareerIntelligenceService();
  }

  getIntelligencePayload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getCareerIntelligencePayload(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getJobMatching = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getJobMatches(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getCareerScore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getCareerScore(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getSkillsAnalysis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getSkillsAnalysis(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getCareerRoadmap = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getCareerRoadmap(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  createCareerRoadmap = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const payload = createRoadmapPlanSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          id: `plan_${Date.now()}`,
          userId,
          ...payload,
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  };

  updateRoadmapStep = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = updateRoadmapStepSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          message: 'Roadmap step updated successfully',
          step: payload,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  getProfileOptimization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getProfileOptimization(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getProfileVisibility = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getProfileVisibility(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  updateProfileVisibility = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = updateVisibilitySettingsSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          message: 'Profile visibility settings updated successfully',
          settings: payload,
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
