import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service.js';

export class AnalyticsController {
  private service = new AnalyticsService();

  getMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const metrics = await this.service.getMetrics(employerId);
      res.status(200).json({ success: true, data: metrics });
    } catch (error) {
      next(error);
    }
  };

  getProductivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const productivity = await this.service.getProductivity(employerId);
      res.status(200).json({ success: true, data: productivity });
    } catch (error) {
      next(error);
    }
  };

  createAutomationRule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const rule = await this.service.createAutomationRule(employerId, req.body);
      res.status(201).json({ success: true, data: rule });
    } catch (error) {
      next(error);
    }
  };

  getAutomationRules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const rules = await this.service.getAutomationRules(employerId);
      res.status(200).json({ success: true, data: rules });
    } catch (error) {
      next(error);
    }
  };

  toggleAutomationRule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { isEnabled } = req.body;
      const rule = await this.service.toggleAutomationRule(id, isEnabled);
      res.status(200).json({ success: true, data: rule });
    } catch (error) {
      next(error);
    }
  };
}
