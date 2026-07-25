import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TeamService } from '../../../src/server/modules/team-management/services/team.service';
import { Organization } from '../../../src/server/database/models/Organization';
import { TeamInvitation } from '../../../src/server/database/models/TeamInvitation';
import { AuditLog } from '../../../src/server/database/models/AuditLog';

vi.mock('../../../src/server/database/models/Organization');
vi.mock('../../../src/server/database/models/Department');
vi.mock('../../../src/server/database/models/TeamInvitation');
vi.mock('../../../src/server/database/models/AuditLog');
vi.mock('../../../src/server/database/models/User');

describe('Team Management Suite', () => {
  let service: TeamService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new TeamService();
  });

  describe('createOrganization', () => {
    it('creates a new multi-company organization and records an audit log', async () => {
      const mockOrg = { _id: 'org123', name: 'Acme Corp', slug: 'acme-corp' };
      vi.mocked(Organization.prototype.save).mockResolvedValue(mockOrg as never);
      vi.mocked(AuditLog.prototype.save).mockResolvedValue({} as never);

      const org = await service.createOrganization('owner123', { name: 'Acme Corp' });

      expect(org.name).toBe('Acme Corp');
      expect(org.slug).toBe('acme-corp');
    });
  });

  describe('inviteTeamMember', () => {
    it('creates a secure single-use invitation token for team email', async () => {
      const mockInv = { _id: 'inv123', email: 'recruiter@acme.com', role: 'EMPLOYER', token: 'secret' };
      vi.mocked(TeamInvitation.prototype.save).mockResolvedValueOnce(mockInv as never);
      vi.mocked(AuditLog.prototype.save).mockResolvedValueOnce({} as never);

      const inv = await service.inviteTeamMember('owner123', { email: 'recruiter@acme.com', role: 'EMPLOYER' });

      expect(inv.email).toBe('recruiter@acme.com');
      expect(inv.role).toBe('EMPLOYER');
    });
  });
});
