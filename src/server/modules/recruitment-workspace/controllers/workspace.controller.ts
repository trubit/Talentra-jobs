import { Request, Response, NextFunction } from 'express';
import { WorkspaceService } from '../services/workspace.service.js';

export class WorkspaceController {
  private service = new WorkspaceService();

  createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const tag = await this.service.createTag(employerId, req.body);
      res.status(201).json({ success: true, data: tag });
    } catch (error) {
      next(error);
    }
  };

  getTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const tags = await this.service.getTags(employerId);
      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      next(error);
    }
  };

  createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const task = await this.service.createTask(employerId, req.body);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  };

  getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id.toString();
      const tasks = await this.service.getTasks(userId);
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  };

  updateTaskStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const task = await this.service.updateTaskStatus(id, status);
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  };

  createSavedSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const search = await this.service.createSavedSearch(employerId, req.body);
      res.status(201).json({ success: true, data: search });
    } catch (error) {
      next(error);
    }
  };

  getSavedSearches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const searches = await this.service.getSavedSearches(employerId);
      res.status(200).json({ success: true, data: searches });
    } catch (error) {
      next(error);
    }
  };

  deleteSavedSearch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const employerId = req.user!._id.toString();
      const result = await this.service.deleteSavedSearch(id, employerId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { applicationId } = req.params;
      const authorId = req.user!._id.toString();
      const note = await this.service.createNote(applicationId, authorId, req.body);
      res.status(201).json({ success: true, data: note });
    } catch (error) {
      next(error);
    }
  };

  getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { applicationId } = req.params;
      const notes = await this.service.getNotes(applicationId);
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      next(error);
    }
  };

  compareCandidates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { applicationIds } = req.body;
      const comparison = await this.service.compareCandidates(applicationIds);
      res.status(200).json({ success: true, data: comparison });
    } catch (error) {
      next(error);
    }
  };

  bulkActions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = req.user!._id.toString();
      const result = await this.service.bulkActions(actorId, req.body);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
}
