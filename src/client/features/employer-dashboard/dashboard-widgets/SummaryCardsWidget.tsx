import { Grid, Paper, Box, Typography, Stack, Skeleton } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import DraftsIcon from '@mui/icons-material/Drafts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DashboardSummaryData } from '../services/employerDashboardApi';

interface SummaryCardsWidgetProps {
  summary?: DashboardSummaryData;
  isLoading: boolean;
}

export function SummaryCardsWidget({ summary, isLoading }: SummaryCardsWidgetProps) {
  const cards = [
    { label: 'Active Jobs', value: summary?.activeJobs || 0, icon: <WorkIcon color="primary" />, color: 'primary.main' },
    { label: 'Draft Jobs', value: summary?.draftJobs || 0, icon: <DraftsIcon color="warning" />, color: 'warning.main' },
    { label: 'Applications Received', value: summary?.applicationsReceived || 0, icon: <AssignmentIcon color="info" />, color: 'info.main' },
    { label: 'Shortlisted Candidates', value: summary?.shortlistedCandidates || 0, icon: <PeopleIcon color="secondary" />, color: 'secondary.main' },
    { label: 'Scheduled Interviews', value: summary?.interviewsScheduled || 0, icon: <CalendarMonthIcon color="info" />, color: 'info.dark' },
    { label: 'Offers Sent', value: summary?.offersSent || 0, icon: <LocalOfferIcon color="warning" />, color: 'warning.dark' },
    { label: 'Hired Candidates', value: summary?.hiredCandidates || 0, icon: <CheckCircleIcon color="success" />, color: 'success.main' },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map((card, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={idx}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '20px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {card.label}
                </Typography>
                {isLoading ? (
                  <Skeleton width={60} height={40} />
                ) : (
                  <Typography variant="h4" fontWeight={800} color={card.color}>
                    {card.value.toLocaleString()}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '14px',
                  bgcolor: 'action.hover',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {card.icon}
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
