import { Organization, IOrganization } from '../../../database/models/Organization.js';
import { Department, IDepartment } from '../../../database/models/Department.js';
import { TeamInvitation, ITeamInvitation } from '../../../database/models/TeamInvitation.js';
import { AuditLog, IAuditLog } from '../../../database/models/AuditLog.js';
import { User, IUser } from '../../../database/models/User.js';

export class TeamRepository {
  async createOrganization(data: Partial<IOrganization>): Promise<IOrganization> {
    const org = new Organization(data);
    return org.save();
  }

  async getOrganizations(ownerId: string): Promise<IOrganization[]> {
    return Organization.find({ owner: ownerId, isArchived: false }).populate('companies');
  }

  async createDepartment(data: Partial<IDepartment>): Promise<IDepartment> {
    const dept = new Department(data);
    return dept.save();
  }

  async getDepartments(employerId: string): Promise<IDepartment[]> {
    return Department.find({ employer: employerId, isArchived: false }).sort({ name: 1 });
  }

  async createInvitation(data: Partial<ITeamInvitation>): Promise<ITeamInvitation> {
    const invitation = new TeamInvitation(data);
    return invitation.save();
  }

  async getInvitations(employerId: string): Promise<ITeamInvitation[]> {
    return TeamInvitation.find({ employer: employerId, status: 'PENDING' }).sort({ createdAt: -1 });
  }

  async getTeamMembers(_employerId: string): Promise<IUser[]> {
    return User.find({ role: { $in: ['EMPLOYER', 'ADMIN'] } })
      .select('-passwordHash')
      .sort({ createdAt: -1 });
  }

  async recordAuditLog(data: Partial<IAuditLog>): Promise<IAuditLog> {
    const log = new AuditLog(data);
    return log.save();
  }

  async getAuditLogs(actorId: string, limit = 50): Promise<IAuditLog[]> {
    return AuditLog.find({ actor: actorId }).sort({ createdAt: -1 }).limit(limit);
  }
}
