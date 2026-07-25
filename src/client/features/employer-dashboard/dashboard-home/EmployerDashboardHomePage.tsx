import { Container, Typography, Box, Grid, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import {
  useEmployerDashboardSummary,
  useEmployerActivityFeed,
  useEmployerRecentJobs,
  useEmployerRecentApplications,
} from '../hooks/useEmployerDashboard';
import { SummaryCardsWidget } from '../dashboard-widgets/SummaryCardsWidget';
import { QuickActionsPanel } from '../quick-actions/QuickActionsPanel';
import { ActivityFeedWidget } from '../activity-feed/ActivityFeedWidget';
import { RecentJobsWidget, RecentApplicationsWidget } from '../dashboard-widgets/RecentItemsWidget';
import { SEO } from '../../../components/seo/SEO';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { AppAlert } from '../../../components/feedback/AppAlert';
import { employerDashboardApi } from '../services/employerDashboardApi';

export function EmployerDashboardHomePage() {
  const { user } = useAuthStore();

  const summaryQuery = useEmployerDashboardSummary();
  const activityQuery = useEmployerActivityFeed();
  const jobsQuery = useEmployerRecentJobs();
  const appsQuery = useEmployerRecentApplications();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ jobs?: unknown[]; applications?: unknown[] } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    try {
      const data = await employerDashboardApi.search(searchQuery);
      setSearchResults(data);
    } catch {
      // Ignore
    }
  };

  return (
    <>
      <SEO title="Employer Dashboard — Talentra Enterprise Portal" />

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Welcome back, {user?.firstName || 'Recruiter'} 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here is your live enterprise recruitment workspace summary, active pipeline, and candidate metrics.
          </Typography>
        </Box>

        {/* Global Dashboard Search Bar */}
        <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid', borderColor: 'divider', mb: 4 }}>
          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search across all posted jobs, applicant names, emails, and active candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </form>

          {searchResults && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: '12px' }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Search Results ({((searchResults.jobs?.length || 0) + (searchResults.applications?.length || 0))} matches)
              </Typography>
              {searchResults.jobs && searchResults.jobs.length > 0 && (
                <Typography variant="body2" color="primary" fontWeight={600}>
                  Matched Jobs: {searchResults.jobs.length} postings found.
                </Typography>
              )}
              {searchResults.applications && searchResults.applications.length > 0 && (
                <Typography variant="body2" color="secondary" fontWeight={600}>
                  Matched Applicants: {searchResults.applications.length} candidates found.
                </Typography>
              )}
            </Box>
          )}
        </Paper>

        {summaryQuery.isError && (
          <AppAlert severity="error" sx={{ mb: 3 }}>
            Failed to load live summary metrics. Please refresh the page.
          </AppAlert>
        )}

        {/* Quick Actions Panel */}
        <QuickActionsPanel />

        {/* Live Summary Cards */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5 }}>
            📊 Recruitment Overview & Metrics
          </Typography>
          <SummaryCardsWidget summary={summaryQuery.data} isLoading={summaryQuery.isLoading} />
        </Box>

        {/* Main Grid: Activity & Recent Items */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <RecentJobsWidget jobs={jobsQuery.data} isLoading={jobsQuery.isLoading} />
            <RecentApplicationsWidget applications={appsQuery.data} isLoading={appsQuery.isLoading} />
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <ActivityFeedWidget activities={activityQuery.data} isLoading={activityQuery.isLoading} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
