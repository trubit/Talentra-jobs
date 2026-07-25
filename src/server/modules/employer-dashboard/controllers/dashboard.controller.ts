import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

export class DashboardController {
  private service = new DashboardService();

  getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const summary = await this.service.getSummary(employerId);
      res.status(200).json({ success: true, data: summary });
    } catch (error) {
      next(error);
    }
  };

  getActivityFeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const activity = await this.service.getActivityFeed(employerId);
      res.status(200).json({ success: true, data: activity });
    } catch (error) {
      next(error);
    }
  };

  getRecentJobs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const jobs = await this.service.getRecentJobs(employerId);
      res.status(200).json({ success: true, data: jobs });
    } catch (error) {
      next(error);
    }
  };

  getRecentApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const applications = await this.service.getRecentApplications(employerId);
      res.status(200).json({ success: true, data: applications });
    } catch (error) {
      next(error);
    }
  };

  getRecentInterviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const interviews = await this.service.getRecentInterviews(employerId);
      res.status(200).json({ success: true, data: interviews });
    } catch (error) {
      next(error);
    }
  };

  search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const query = (req.query.q as string) || '';
      const results = await this.service.search(employerId, query);
      res.status(200).json({ success: true, data: results });
    } catch (error) {
      next(error);
    }
  };

  getPreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const preferences = await this.service.getPreferences(userId);
      res.status(200).json({ success: true, data: preferences });
    } catch (error) {
      next(error);
    }
  };

  updatePreferences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const preferences = await this.service.updatePreferences(userId, req.body);
      res.status(200).json({ success: true, data: preferences });
    } catch (error) {
      next(error);
    }
  };
}
