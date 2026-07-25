import { Paper, Typography, Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

export function QuickActionsPanel() {
  const navigate = useNavigate();

  const actions = [
    { label: 'Post New Job', icon: <AddCircleIcon />, color: 'primary', path: '/jobs/new' },
    { label: 'Recruitment ATS Workspace', icon: <AssignmentIcon />, color: 'secondary', path: '/employer/ats' },
    { label: 'Interviews Portal', icon: <CalendarMonthIcon />, color: 'info', path: '/employer/interviews' },
    { label: 'Job Offers Portal', icon: <LocalOfferIcon />, color: 'warning', path: '/employer/offers' },
    { label: 'Company Profile', icon: <BusinessIcon />, color: 'inherit', path: '/company/dashboard' },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', mb: 4 }}>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
        ⚡ Quick Operational Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={idx}>
            <Button
              fullWidth
              variant="outlined"
              color={action.color as 'primary' | 'secondary' | 'info' | 'warning' | 'inherit'}
              startIcon={action.icon}
              onClick={() => navigate(action.path)}
              sx={{ py: 1.5, borderRadius: '12px', fontWeight: 700, justifyContent: 'flex-start' }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
