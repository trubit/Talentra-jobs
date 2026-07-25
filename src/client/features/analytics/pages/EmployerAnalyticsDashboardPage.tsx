import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Stack,
  Button,
  Switch,
  Chip,
  LinearProgress,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import {
  useEmployerAnalytics,
  useRecruiterProductivity,
  useAutomationRules,
  useCreateAutomationRule,
  useToggleAutomationRule,
} from '../hooks/useAnalytics';
import { SEO } from '../../../components/seo/SEO';

export function EmployerAnalyticsDashboardPage() {
  const analyticsQuery = useEmployerAnalytics();
  const productivityQuery = useRecruiterProductivity();
  const automationQuery = useAutomationRules();

  const createRuleMutation = useCreateAutomationRule();
  const toggleRuleMutation = useToggleAutomationRule();

  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [ruleTitle, setRuleTitle] = useState('');
  const [ruleTrigger, setRuleTrigger] = useState<'JOB_EXPIRED' | 'APPLICATION_RECEIVED' | 'TASK_OVERDUE' | 'STAGE_UNCHANGED'>('APPLICATION_RECEIVED');
  const [ruleAction, setRuleAction] = useState('AUTO_SHORTLIST');

  const handleCreateRule = async () => {
    if (!ruleTitle.trim()) return;
    await createRuleMutation.mutateAsync({ title: ruleTitle, trigger: ruleTrigger, action: ruleAction });
    setRuleTitle('');
    setRuleDialogOpen(false);
  };

  const metrics = analyticsQuery.data;
  const prod = productivityQuery.data;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <SEO title="Employer Recruitment Analytics & Workspace Automation — Talentra" />

      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            📈 Recruitment Analytics & Workspace Automation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Live hiring performance metrics, candidate conversion rates, recruiter velocity, and workflow automation.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setRuleDialogOpen(true)}>
          New Automation Rule
        </Button>
      </Stack>

      {/* Top Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                CANDIDATE CONVERSION RATE
              </Typography>
              <TrendingUpIcon color="success" />
            </Stack>
            {analyticsQuery.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h4" fontWeight={800} color="success.main">
                {metrics?.conversionRate}%
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              Applicants converted to hired
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                AVG TIME-TO-HIRE
              </Typography>
              <SpeedIcon color="primary" />
            </Stack>
            {analyticsQuery.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h4" fontWeight={800} color="primary.main">
                {metrics?.averageTimeToHireDays} Days
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              From application to job offer
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ mb: 1 }}>
              TOTAL APPLICATIONS REVIEWED
            </Typography>
            {productivityQuery.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h4" fontWeight={800} color="info.main">
                {prod?.applicationsReviewed}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              Processed across pipeline
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ mb: 1 }}>
              AVG RECRUITER RESPONSE
            </Typography>
            {productivityQuery.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h4" fontWeight={800} color="secondary.main">
                {prod?.averageResponseTimeHours} Hours
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              Turnaround time per applicant
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Main Grid: Pipeline Breakdown & Automation */}
      <Grid container spacing={4}>
        {/* Candidate Pipeline Conversion Breakdown */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: '20px', border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>
              📊 Candidate Funnel & Pipeline Health
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={700}>Total Applications Received</Typography>
                  <Typography variant="subtitle2" fontWeight={800}>{metrics?.totalApplications || 0}</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={100} sx={{ height: 10, borderRadius: 5 }} color="info" />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={700}>Shortlisted Candidates</Typography>
                  <Typography variant="subtitle2" fontWeight={800}>{metrics?.shortlistedCount || 0}</Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={metrics?.totalApplications ? (metrics.shortlistedCount / metrics.totalApplications) * 100 : 0}
                  sx={{ height: 10, borderRadius: 5 }}
                  color="primary"
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={700}>Interviews Scheduled</Typography>
                  <Typography variant="subtitle2" fontWeight={800}>{metrics?.interviewCount || 0}</Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={metrics?.totalApplications ? (metrics.interviewCount / metrics.totalApplications) * 100 : 0}
                  sx={{ height: 10, borderRadius: 5 }}
                  color="secondary"
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={700}>Hired Candidates</Typography>
                  <Typography variant="subtitle2" fontWeight={800}>{metrics?.hiredCount || 0}</Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={metrics?.totalApplications ? (metrics.hiredCount / metrics.totalApplications) * 100 : 0}
                  sx={{ height: 10, borderRadius: 5 }}
                  color="success"
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Configurable Workspace Automation */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <AutoFixHighIcon color="primary" />
              <Typography variant="h6" fontWeight={800}>
                ⚡ Active Workspace Automations
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Automate repetitive recruiter tasks, candidate stage transitions, and expired vacancy archiving.
            </Typography>

            {automationQuery.isLoading ? (
              <CircularProgress size={28} />
            ) : !automationQuery.data || automationQuery.data.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No automation rules configured. Click "New Automation Rule" to add one.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {automationQuery.data.map((rule) => (
                  <Paper key={rule._id} variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {rule.title}
                      </Typography>
                      <Chip label={rule.trigger} size="small" variant="outlined" sx={{ mt: 0.5, fontSize: '0.7rem' }} />
                    </Box>
                    <Switch
                      checked={rule.isEnabled}
                      onChange={(e) => toggleRuleMutation.mutate({ id: rule._id, isEnabled: e.target.checked })}
                      color="primary"
                    />
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* New Automation Rule Dialog */}
      <Dialog open={ruleDialogOpen} onClose={() => setRuleDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Create Workspace Automation Rule</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Rule Name"
              fullWidth
              value={ruleTitle}
              onChange={(e) => setRuleTitle(e.target.value)}
              placeholder="e.g. Auto-archive expired job postings"
            />
            <TextField select label="Trigger Event" fullWidth value={ruleTrigger} onChange={(e) => setRuleTrigger(e.target.value as never)}>
              <MenuItem value="APPLICATION_RECEIVED">When New Application Arrives</MenuItem>
              <MenuItem value="JOB_EXPIRED">When Vacancy Expires</MenuItem>
              <MenuItem value="TASK_OVERDUE">When Task is Overdue</MenuItem>
              <MenuItem value="STAGE_UNCHANGED">When Candidate Inactive for 7 Days</MenuItem>
            </TextField>
            <TextField select label="Automated Action" fullWidth value={ruleAction} onChange={(e) => setRuleAction(e.target.value)}>
              <MenuItem value="AUTO_SHORTLIST">Auto-Move to Under Review</MenuItem>
              <MenuItem value="AUTO_ARCHIVE_JOB">Auto-Archive Job Posting</MenuItem>
              <MenuItem value="SEND_RECRUITER_REMINDER">Send Recruiter Task Reminder</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setRuleDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateRule} disabled={!ruleTitle.trim() || createRuleMutation.isPending}>
            {createRuleMutation.isPending ? 'Saving...' : 'Create Rule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
