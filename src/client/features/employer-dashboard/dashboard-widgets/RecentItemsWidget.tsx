import { Paper, Typography, Stack, Box, Button, Chip, Avatar, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

interface RecentJobsProps {
  jobs?: Array<{ _id: string; title: string; status: string; city: string; country: string; createdAt: string }>;
  isLoading: boolean;
}

export function RecentJobsWidget({ jobs, isLoading }: RecentJobsProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          💼 Recent Job Postings
        </Typography>
        <Button size="small" component={Link} to="/employer/ats">
          View All
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={28} />
        </Box>
      ) : !jobs || jobs.length === 0 ? (
        <Typography variant="body2" color="text.secondary" py={2}>
          No jobs posted yet.
        </Typography>
      ) : (
        <Stack spacing={1.5}>
          {jobs.map((job) => (
            <Paper key={job._id} variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>
                  {job.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  📍 {job.city}, {job.country} • Posted {new Date(job.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Chip label={job.status} size="small" color={job.status === 'PUBLISHED' ? 'success' : 'warning'} sx={{ fontWeight: 700 }} />
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
}

interface RecentAppsProps {
  applications?: Array<{
    _id: string;
    status: string;
    createdAt: string;
    applicant?: { firstName?: string; lastName?: string; email?: string; avatarUrl?: string };
    job?: { title?: string };
  }>;
  isLoading: boolean;
}

export function RecentApplicationsWidget({ applications, isLoading }: RecentAppsProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          📑 Recent Candidate Applications
        </Typography>
        <Button size="small" component={Link} to="/employer/ats">
          Open ATS
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={28} />
        </Box>
      ) : !applications || applications.length === 0 ? (
        <Typography variant="body2" color="text.secondary" py={2}>
          No candidate applications received yet.
        </Typography>
      ) : (
        <Stack spacing={1.5}>
          {applications.map((app) => (
            <Paper key={app._id} variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar src={app.applicant?.avatarUrl} sx={{ width: 36, height: 36 }}>
                  {app.applicant?.firstName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {app.applicant?.firstName} {app.applicant?.lastName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Applied for {app.job?.title || 'Position'}
                  </Typography>
                </Box>
              </Stack>
              <Button
                size="small"
                variant="outlined"
                component={Link}
                to={`/employer/applications/${app._id}`}
                startIcon={<VisibilityIcon />}
              >
                Review
              </Button>
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
