import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAuthStore } from '../../../features/auth/store/useAuthStore';
import { useJobSeekerDashboard } from '../hooks/useJobSeekerDashboard';
import { DashboardSummaryCards } from '../components/DashboardSummaryCards';
import { ProfileCompletionCard } from '../components/ProfileCompletionCard';
import { RecentActivityTimeline } from '../components/RecentActivityTimeline';
import { QuickActionsCard } from '../components/QuickActionsCard';
import { DashboardPreferencesModal } from '../components/DashboardPreferencesModal';
import { AppSpinner } from '../../../components/feedback/AppSpinner';
import { AppAlert } from '../../../components/feedback/AppAlert';
import { SEO } from '../../../components/seo/SEO';
import { JobCard } from '../../../components/cards/JobCard';
import { useNavigate } from 'react-router-dom';

interface JobPreviewDoc {
  _id: string;
  title: string;
  companyName?: string;
  companyLogoUrl?: string;
  location?: string;
  salaryRange?: string;
  employmentType?: string;
  createdAt: string;
  tags?: string[];
}

export function JobSeekerDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data, isLoading, error, refetch, updatePreferences } = useJobSeekerDashboard();
  const [prefModalOpen, setPrefModalOpen] = useState(false);

  if (isLoading) {
    return <AppSpinner fullPage label="Loading Candidate Dashboard..." />;
  }

  if (error || !data) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <AppAlert severity="error">
          Failed to load dashboard metrics. Please refresh.
        </AppAlert>
        <Button variant="outlined" onClick={() => refetch()} sx={{ mt: 2 }}>
          Retry Load
        </Button>
      </Container>
    );
  }

  const recommendedJobs = (data.recommendedJobsPreview || []) as unknown as JobPreviewDoc[];

  return (
    <>
      <SEO title="Job Seeker Workspace | Talentra" description="Manage your career, applications, resumes, and saved jobs." />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Top Welcome Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.5px">
              Welcome back, {user?.firstName || 'Candidate'} 👋
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Here is your career overview, active applications, and job recommendations.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Tooltip title="Refresh Metrics">
              <IconButton onClick={() => refetch()} color="inherit">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => setPrefModalOpen(true)}
              sx={{ borderRadius: '12px', fontWeight: 600 }}
            >
              Dashboard Settings
            </Button>
          </Stack>
        </Box>

        <Stack spacing={4}>
          {/* Summary KPI Cards */}
          <DashboardSummaryCards summary={data.summary} />

          {/* Quick Actions Toolbar */}
          <QuickActionsCard actions={data.quickActions} />

          {/* Main 2-Column Grid */}
          <Grid container spacing={3}>
            {/* Left Column: Profile Completion */}
            <Grid size={{ xs: 12, md: 5 }}>
              <ProfileCompletionCard completion={data.profileCompletion} />
            </Grid>

            {/* Right Column: Recent Activity Feed */}
            <Grid size={{ xs: 12, md: 7 }}>
              <RecentActivityTimeline activities={data.recentActivity} />
            </Grid>
          </Grid>

          {/* Recommended Jobs Preview */}
          {recommendedJobs.length > 0 && (
            <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Recommended Opportunities For You
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Based on your profile skills and experience preferences
                  </Typography>
                </Box>
                <Button variant="text" onClick={() => navigate('/jobs')}>
                  View All Jobs →
                </Button>
              </Box>

              <Grid container spacing={3}>
                {recommendedJobs.map((job) => (
                  <Grid key={job._id} size={{ xs: 12, md: 4 }}>
                    <JobCard
                      id={job._id}
                      title={job.title}
                      companyName={job.companyName || 'Company'}
                      companyLogo={job.companyLogoUrl}
                      location={job.location || 'Remote'}
                      salary={job.salaryRange || 'Competitive'}
                      jobType={job.employmentType || 'FULL_TIME'}
                      postedDate={new Date(job.createdAt).toLocaleDateString()}
                      tags={job.tags || []}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Stack>
      </Container>

      {/* Preferences Modal */}
      <DashboardPreferencesModal
        open={prefModalOpen}
        preferences={data.preferences}
        onClose={() => setPrefModalOpen(false)}
        onSave={async (updated) => {
          await updatePreferences(updated);
        }}
      />
    </>
  );
}
