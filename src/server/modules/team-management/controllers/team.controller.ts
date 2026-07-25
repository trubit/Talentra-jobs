import { Request, Response, NextFunction } from 'express';
import { TeamService } from '../services/team.service.js';

export class TeamController {
  private service = new TeamService();

  createOrganization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ownerId = req.user!._id.toString();
      const org = await this.service.createOrganization(ownerId, req.body);
      res.status(201).json({ success: true, data: org });
    } catch (error) {
      next(error);
    }
  };

  getOrganizations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ownerId = req.user!._id.toString();
      const orgs = await this.service.getOrganizations(ownerId);
      res.status(200).json({ success: true, data: orgs });
    } catch (error) {
      next(error);
    }
  };

  createDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const dept = await this.service.createDepartment(employerId, req.body);
      res.status(201).json({ success: true, data: dept });
    } catch (error) {
      next(error);
    }
  };

  getDepartments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const depts = await this.service.getDepartments(employerId);
      res.status(200).json({ success: true, data: depts });
    } catch (error) {
      next(error);
    }
  };

  inviteTeamMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const invitation = await this.service.inviteTeamMember(employerId, req.body);
      res.status(201).json({ success: true, data: invitation });
    } catch (error) {
      next(error);
    }
  };

  getInvitations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const invitations = await this.service.getInvitations(employerId);
      res.status(200).json({ success: true, data: invitations });
    } catch (error) {
      next(error);
    }
  };

  getTeamMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employerId = req.user!._id.toString();
      const members = await this.service.getTeamMembers(employerId);
      res.status(200).json({ success: true, data: members });
    } catch (error) {
      next(error);
    }
  };

  updateTeamMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = req.user!._id.toString();
      const { id } = req.params;
      const updated = await this.service.updateTeamMember(actorId, id, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      next(error);
    }
  };

  getAuditLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const actorId = req.user!._id.toString();
      const logs = await this.service.getAuditLogs(actorId);
      res.status(200).json({ success: true, data: logs });
    } catch (error) {
      next(error);
    }
  };
}
