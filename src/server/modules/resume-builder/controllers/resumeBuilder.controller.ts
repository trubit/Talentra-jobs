import { Request, Response, NextFunction } from 'express';
import { ResumeBuilderService } from '../services/resumeBuilder.service.js';
import {
  createResumeSchema,
  updateResumeSchema,
  createCoverLetterSchema,
  createPortfolioProjectSchema,
} from '../validators/resumeBuilder.validator.js';

export class ResumeBuilderController {
  private service: ResumeBuilderService;

  constructor() {
    this.service = new ResumeBuilderService();
  }

  getBuilderPayload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const data = await this.service.getResumeBuilderPayload(userId);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  createResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const payload = createResumeSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          id: `res_${Date.now()}`,
          userId,
          title: payload.title,
          templateId: payload.templateId,
          sections: [],
          isPrimary: Boolean(payload.isPrimary),
          version: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  };

  updateResume = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = updateResumeSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          message: 'Resume updated successfully',
          resume: payload,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  generateShareToken = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const shareToken = `share_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      res.json({
        success: true,
        data: {
          shareToken,
          shareUrl: `${process.env.CLIENT_URL || 'http://localhost:5173'}/resume/share/${shareToken}`,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  };

  createCoverLetter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const payload = createCoverLetterSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          id: `cl_${Date.now()}`,
          userId,
          ...payload,
          isDefault: Boolean(payload.isDefault),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  };

  createPortfolioProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const payload = createPortfolioProjectSchema.parse(req.body);
      res.json({
        success: true,
        data: {
          id: `proj_${Date.now()}`,
          userId,
          ...payload,
          order: 1,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  };
}
