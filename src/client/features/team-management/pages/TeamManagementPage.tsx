import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  Avatar,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DomainIcon from '@mui/icons-material/Domain';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';
import {
  useTeamMembers,
  useTeamInvitations,
  useInviteTeamMember,
  useDepartments,
  useCreateDepartment,
  useAuditLogs,
} from '../hooks/useTeamManagement';
import { SEO } from '../../../components/seo/SEO';

export function TeamManagementPage() {
  const membersQuery = useTeamMembers();
  const invitationsQuery = useTeamInvitations();
  const departmentsQuery = useDepartments();
  const auditLogsQuery = useAuditLogs();

  const inviteMutation = useInviteTeamMember();
  const createDeptMutation = useCreateDepartment();

  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'EMPLOYER' | 'ADMIN'>('EMPLOYER');

  const [deptDialogOpen, setDeptDialogOpen] = useState(false);
  const [deptName, setDeptName] = useState('');

  const handleSendInvite = async () => {
    if (!inviteEmail.trim()) return;
    await inviteMutation.mutateAsync({ email: inviteEmail, role: inviteRole });
    setInviteEmail('');
    setInviteDialogOpen(false);
  };

  const handleCreateDepartment = async () => {
    if (!deptName.trim()) return;
    await createDeptMutation.mutateAsync({ name: deptName });
    setDeptName('');
    setDeptDialogOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <SEO title="Team Management & Organization Permissions — Talentra" />

      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            👥 Multi-Company Team & Roles Administration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage enterprise team members, company departments, RBAC roles, single-use invitations, and audit histories.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DomainIcon />} onClick={() => setDeptDialogOpen(true)}>
            Add Department
          </Button>
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setInviteDialogOpen(true)}>
            Invite Recruiter
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={4}>
        {/* Active Team Members */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
              Active Organization Members ({membersQuery.data?.length || 0})
            </Typography>

            {membersQuery.isLoading ? (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress size={28} />
              </Box>
            ) : !membersQuery.data || membersQuery.data.length === 0 ? (
              <Typography color="text.secondary" variant="body2">
                No active team members found.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {membersQuery.data.map((m) => (
                  <Paper key={m._id} variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={m.avatarUrl} sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontWeight: 700 }}>
                        {m.firstName?.[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>
                          {m.firstName} {m.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {m.email}
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip label={m.role} color={m.role === 'ADMIN' ? 'secondary' : 'primary'} size="small" sx={{ fontWeight: 800 }} />
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>

          {/* Pending Invitations */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
              Pending Team Invitations ({invitationsQuery.data?.length || 0})
            </Typography>

            {invitationsQuery.isLoading ? (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress size={28} />
              </Box>
            ) : !invitationsQuery.data || invitationsQuery.data.length === 0 ? (
              <Typography color="text.secondary" variant="body2">
                No pending email invitations.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {invitationsQuery.data.map((inv) => (
                  <Paper key={inv._id} variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {inv.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Role: {inv.role} • Expires {new Date(inv.expiresAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip label="PENDING" color="warning" size="small" sx={{ fontWeight: 800 }} />
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* Sidebar: Departments & Audit Log */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Departments Widget */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
              🏢 Organization Departments
            </Typography>
            {departmentsQuery.isLoading ? (
              <CircularProgress size={24} />
            ) : !departmentsQuery.data || departmentsQuery.data.length === 0 ? (
              <Typography color="text.secondary" variant="body2">
                No departments configured yet.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {departmentsQuery.data.map((dept) => (
                  <Box key={dept._id} sx={{ p: 1.5, borderRadius: '10px', bgcolor: 'action.hover' }}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {dept.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>

          {/* Audit Logs */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <HistoryIcon color="action" />
              <Typography variant="h6" fontWeight={800}>
                Immutable Audit Trail
              </Typography>
            </Stack>

            {auditLogsQuery.isLoading ? (
              <CircularProgress size={24} />
            ) : !auditLogsQuery.data || auditLogsQuery.data.length === 0 ? (
              <Typography color="text.secondary" variant="body2">
                No administrative actions recorded yet.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {auditLogsQuery.data.slice(0, 8).map((log) => (
                  <Box key={log._id} sx={{ p: 1.5, borderRadius: '10px', border: '1px dashed', borderColor: 'divider' }}>
                    <Typography variant="caption" fontWeight={700} color="primary.main" display="block">
                      {log.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(log.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Invite Member Dialog */}
      <Dialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Invite Team Member</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Recipient Email"
              type="email"
              fullWidth
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="recruiter@company.com"
            />
            <TextField select label="Role" fullWidth value={inviteRole} onChange={(e) => setInviteRole(e.target.value as 'EMPLOYER' | 'ADMIN')}>
              <MenuItem value="EMPLOYER">Recruiter / Employer</MenuItem>
              <MenuItem value="ADMIN">Company Administrator</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSendInvite} disabled={!inviteEmail.trim() || inviteMutation.isPending}>
            {inviteMutation.isPending ? 'Sending...' : 'Send Invitation'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Department Dialog */}
      <Dialog open={deptDialogOpen} onClose={() => setDeptDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Create Department</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            label="Department Name"
            fullWidth
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            placeholder="e.g. Human Resources, Engineering"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeptDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateDepartment} disabled={!deptName.trim() || createDeptMutation.isPending}>
            {createDeptMutation.isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
