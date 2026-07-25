import crypto from 'crypto';
import { TeamRepository } from '../repositories/team.repository.js';
import {
  CreateOrganizationDto,
  CreateDepartmentDto,
  InviteTeamMemberDto,
  UpdateTeamMemberDto,
} from '../dto/team.dto.js';
import { User } from '../../../database/models/User.js';
import { AppError } from '../../../utils/AppError.js';

export class TeamService {
  private repo = new TeamRepository();

  async createOrganization(ownerId: string, dto: CreateOrganizationDto) {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const org = await this.repo.createOrganization({
      name: dto.name,
      slug,
      owner: ownerId as never,
    });

    await this.repo.recordAuditLog({
      actor: ownerId as never,
      action: 'ORGANIZATION_CREATED',
      resource: 'Organization',
      resourceId: org._id.toString(),
      details: { name: dto.name },
    });

    return org;
  }

  async getOrganizations(ownerId: string) {
    return this.repo.getOrganizations(ownerId);
  }

  async createDepartment(employerId: string, dto: CreateDepartmentDto) {
    const dept = await this.repo.createDepartment({
      employer: employerId as never,
      name: dto.name,
      code: dto.code,
      description: dto.description,
    });

    await this.repo.recordAuditLog({
      actor: employerId as never,
      action: 'DEPARTMENT_CREATED',
      resource: 'Department',
      resourceId: dept._id.toString(),
      details: { name: dto.name },
    });

    return dept;
  }

  async getDepartments(employerId: string) {
    return this.repo.getDepartments(employerId);
  }

  async inviteTeamMember(employerId: string, dto: InviteTeamMemberDto) {
    const email = dto.email.trim().toLowerCase();
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    const invitation = await this.repo.createInvitation({
      employer: employerId as never,
      email,
      role: dto.role || 'EMPLOYER',
      department: dto.departmentId as never,
      token,
      expiresAt,
      status: 'PENDING',
    });

    await this.repo.recordAuditLog({
      actor: employerId as never,
      action: 'TEAM_MEMBER_INVITED',
      resource: 'TeamInvitation',
      resourceId: invitation._id.toString(),
      details: { email, role: dto.role },
    });

    return invitation;
  }

  async getInvitations(employerId: string) {
    return this.repo.getInvitations(employerId);
  }

  async getTeamMembers(employerId: string) {
    return this.repo.getTeamMembers(employerId);
  }

  async updateTeamMember(actorId: string, targetMemberId: string, dto: UpdateTeamMemberDto) {
    const member = await User.findById(targetMemberId);
    if (!member) {
      throw new AppError('Team member not found', 404, 'NOT_FOUND');
    }

    if (dto.role) member.role = dto.role;
    await member.save();

    await this.repo.recordAuditLog({
      actor: actorId as never,
      action: 'TEAM_MEMBER_UPDATED',
      resource: 'User',
      resourceId: targetMemberId,
      details: { role: dto.role, departmentId: dto.departmentId },
    });

    return member;
  }

  async getAuditLogs(actorId: string) {
    return this.repo.getAuditLogs(actorId);
  }
}
