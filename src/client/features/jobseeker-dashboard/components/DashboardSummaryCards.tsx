import { Grid, Paper, Box, Typography, Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VerifiedIcon from '@mui/icons-material/Verified';
import { DashboardSummaryMetrics } from '../types/jobseekerDashboard.types';

interface DashboardSummaryCardsProps {
  summary: DashboardSummaryMetrics;
}

export function DashboardSummaryCards({ summary }: DashboardSummaryCardsProps) {
  const cards = [
    {
      title: 'Applications Submitted',
      value: summary.applicationsSubmitted,
      subtitle: `${summary.activeApplications} active in review`,
      icon: <AssignmentIcon sx={{ color: 'primary.main' }} />,
      bgColor: 'primary.50',
      color: 'primary.main',
    },
    {
      title: 'Saved Jobs',
      value: summary.savedJobs,
      subtitle: 'Bookmarks ready to apply',
      icon: <BookmarkIcon sx={{ color: 'secondary.main' }} />,
      bgColor: 'secondary.50',
      color: 'secondary.main',
    },
    {
      title: 'Interviews Scheduled',
      value: summary.interviewsScheduled,
      subtitle: summary.interviewsScheduled > 0 ? 'Upcoming interviews' : 'No active sessions',
      icon: <EventAvailableIcon sx={{ color: 'warning.main' }} />,
      bgColor: 'warning.50',
      color: 'warning.main',
    },
    {
      title: 'Profile Completeness',
      value: `${summary.profileCompletionPercentage}%`,
      subtitle: summary.profileCompletionPercentage === 100 ? 'All 11 criteria complete' : 'Action items pending',
      icon: <VerifiedIcon sx={{ color: 'success.main' }} />,
      bgColor: 'success.50',
      color: 'success.main',
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                {card.title}
              </Typography>
              <Avatar sx={{ bgcolor: card.bgColor, width: 44, height: 44 }}>{card.icon}</Avatar>
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
              {card.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              {card.subtitle}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
